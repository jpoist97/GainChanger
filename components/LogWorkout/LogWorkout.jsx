import React, { useState } from 'react';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import ProgressBar from 'react-native-progress/Bar';
import ExerciseDetails from './ExerciseDetails';
import FinishButton from '../utils/FinishButton';
import ModalWapper from '../utils/ModalScreenWrapper';
import { COLORS, INCREMENT_SELECTED_CYCLE_INDEX } from '../../constants/index';
import actions from '../../actions/index';

const StyledFinishButton = styled(FinishButton)`
  position: absolute;
  top: 80px;
  right: 20px;
`;

const TitleText = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 24px;
  margin: 15px 15px;
`;

const StyledProgressBar = styled(ProgressBar)`
  margin: 5px 15px 10px 15px;
`;

const parseExercises = (exercises) => exercises.map((exercise) => {
  const exerciseType = exercise.sets[0].reps ? 'REPS' : 'SECS';

  return {
    id: exercise.exerciseId,
    name: exercise.name,
    color: exercise.color,
    type: exerciseType,
    sets: exercise.sets.map((set) => ({
      prevWeight: (set.weight ? set.weight.toString() : 'n/a'),
      weight: '',
      prevDuration: exerciseType === 'REPS' ? set.reps.toString() : set.time.toString(),
      duration: '',
      completed: false,
    })),
  };
});

/**
 * The exercises prop expect and object with the following formatting.
 * The weight and reps of each set it the previous weight/rep count.
 * {
 *    name: String,
 *    color: String,
 *    sets: [{ weight: String, reps: String }]
 * }
 *
 */
const LogWorkout = (props) => {
  const {
    route: {
      params: {
        workoutId, isSelectedCycle, cycleLength,
      },
    },
  } = props;

  // get the workout details from redux based on workoutid
  console.log(`Opening Log Workout for workout id ${workoutId}`);

  const exerciseStore = useSelector((state) => state.exercises.exercises);
  const workouts = useSelector((state) => state.workouts.workouts);
  const cycleIdx = useSelector((state) => state.cycles.selectedCycleIndex);
  const selectedWorkout = _.find(workouts, (workout) => workout.id === workoutId);

  const { name } = selectedWorkout;

  const exercises = selectedWorkout.exercises.map((exerciseObj, index) => {
    const matchingExercise = _.find(exerciseStore, (exercise) => exerciseObj.exerciseId === exercise.id);

    return {
      ...exerciseObj,
      name: matchingExercise.name,
      color: COLORS[index % 3],
    };
  });

  const navigation = useNavigation();
  const initialExerciseState = parseExercises(exercises);

  const [exerciseState, setExerciseState] = useState(initialExerciseState);

  const currentUser = firebase.auth().currentUser.uid;
  // const currentUser = '68w6wWz8l5QJO3tDukh1fRXWYjD2';

  const dbRef = firebase.firestore();
  const userRef = dbRef.collection('users').doc(currentUser);
  const dispatch = useDispatch();

  const incrementSelectedCycleIdx = () => {
    userRef.update({ selectedCycleIndex: (cycleIdx + 1) % cycleLength });
    dispatch({ type: INCREMENT_SELECTED_CYCLE_INDEX, cycleLength });
  };

  const updatePastWorkoutDates = (completedDate) => {
    userRef.update({ pastWorkoutDates: firebase.firestore.FieldValue.arrayUnion(completedDate) });
  };

  const sendWorkoutLogToDB = () => {
    const workoutRecsRef = userRef.collection('workoutRecords');
    const newWorkoutLog = {
      workoutName: name,
      workoutId,
      date: `${format(new Date(), 'yyyy-MM-dd').toString()}`,
      exercises: exerciseState.map((exercise) => ({
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        sets: exercise.sets.map((set) => {
          const parsedSet = {
            weight: (set.prevWeight === 'n/a' && set.weight === '') ? null : parseInt(set.weight) || parseInt(set.prevWeight),
          };
          _.set(parsedSet, exercise.type === 'REPS' ? ['reps'] : ['time'], parseInt(set.duration) || parseInt(set.prevDuration));
          return parsedSet;
        }),
      })),
    };

    const newWorkoutDoc = {
      lastPerformed: newWorkoutLog.date,
      exercises: newWorkoutLog.exercises,
    };

    userRef.collection('workouts').doc(workoutId).update(newWorkoutDoc); // updates workout doc
    dispatch(actions.workouts.updateWorkoutExercises(workoutId, newWorkoutLog.exercises)); // rerenders workout to show update prev details
    workoutRecsRef.add(newWorkoutLog); // makes a new workoutRecord
  };

  const curryUpdateDuration = (exerciseIndex) => (setIndex) => (duration) => {
    const newExercise = [...exerciseState];

    newExercise[exerciseIndex].sets[setIndex].duration = duration;
    setExerciseState(newExercise);
  };

  const curryUpdateWeight = (exerciseIndex) => (setIndex) => (weight) => {
    const newExercise = [...exerciseState];

    newExercise[exerciseIndex].sets[setIndex].weight = weight;
    setExerciseState(newExercise);
  };

  const curryUpdateCompleted = (exerciseIndex) => (setIndex) => () => {
    const newExercise = [...exerciseState];
    const { completed } = newExercise[exerciseIndex].sets[setIndex];

    newExercise[exerciseIndex].sets[setIndex].completed = !completed;
    setExerciseState(newExercise);
  };

  const curryAddSet = (exerciseIndex) => () => {
    const newExercise = [...exerciseState];
    const { sets } = newExercise[exerciseIndex];

    // Grab the last set for this exercise and mimic it
    const lastSet = _.last(sets);
    newExercise[exerciseIndex].sets.push({
      weight: lastSet.weight,
      prevWeight: lastSet.prevWeight,
      duration: lastSet.duration,
      prevDuration: lastSet.prevDuration,
      completed: false,
    });
    setExerciseState(newExercise);
  };

  const curryDeleteSet = (exerciseIndex) => (setIndex) => () => {
    const newExercise = [...exerciseState];
    const selectedExercise = exerciseState[exerciseIndex];

    // Check if this is the last set left
    if (selectedExercise.sets.length === 1) {
      alert('You cannot delete the last set of a workout');
    } else {
      _.remove(newExercise[exerciseIndex].sets, (val, index) => index === setIndex);
      setExerciseState(newExercise);
    }
  };

  const calculateProgress = () => {
    let completedSetCount = 0;
    let totalSetCount = 0;
    exerciseState.forEach((exercise) => {
      totalSetCount += exercise.sets.length;
      exercise.sets.forEach((set) => {
        if (set.completed === true) {
          completedSetCount += 1;
        }
      });
    });
    return completedSetCount / totalSetCount;
  };

  const renderExerciseDetail = ({ item, index }) => (
    <ExerciseDetails
      name={item.name}
      items={item.sets}
      color={item.color}
      type={item.type}
      updateDuration={curryUpdateDuration(index)}
      updateWeight={curryUpdateWeight(index)}
      updateCompleted={curryUpdateCompleted(index)}
      onSetAdd={curryAddSet(index)}
      onSetDelete={curryDeleteSet(index)}
    />
  );

  return (
    <ModalWapper>
      <TitleText>{name}</TitleText>
      <StyledFinishButton onPress={() => {
        let completed = true;
        for (let i = 0; completed && i < exerciseState.length; i += 1) {
          const { sets } = exerciseState[i];
          for (let j = 0; completed && j < sets.length; j += 1) {
            if (!sets[j].completed) {
              completed = false;
            }
          }
        }
        if (!completed) {
          alert('All sets must be completed to Finish');
        } else {
          sendWorkoutLogToDB();
          updatePastWorkoutDates(`${format(new Date(), 'yyyy-MM-dd').toString()}`);
          if (isSelectedCycle) { incrementSelectedCycleIdx(); }
          navigation.goBack();
        }
      }}
      />
      <StyledProgressBar
        progress={calculateProgress()}
        width={385}
        height={10}
        borderRadius={5}
        color="#6D8DFF"
      />
      <KeyboardAwareFlatList
        style={{ height: '100%' }}
        data={exerciseState}
        renderItem={renderExerciseDetail}
        keyExtractor={(item, index) => item.name + index}
        keyboardOpeningTime={100}
        // this is for a react navigation bug making it not smooth scroll
        extraHeight={-64}
      />
    </ModalWapper>
  );
};

LogWorkout.propTypes = {
  isSelectedCycle: PropTypes.bool,
  route: PropTypes.shape({
    params: PropTypes.shape({
      workoutId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

LogWorkout.defaultProps = {
  isSelectedCycle: false,
};

export default LogWorkout;
