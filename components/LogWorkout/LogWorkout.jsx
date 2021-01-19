/* eslint-disable react/forbid-prop-types, react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _, { set } from 'lodash';
import styled from 'styled-components';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ExerciseDetails from './ExerciseDetails';
import FinishButton from '../utils/FinishButton';
import ModalWapper from '../utils/ModalScreenWrapper';
import { COLORS } from '../../constants/index';

const StyledFinishButton = styled(FinishButton)`
  position: absolute;
  top: 85px;
  right: 20px;
`;

const TitleText = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 24px;
  margin: 15px 15px;
`;

const parseExercises = (exercises) => exercises.map((exercise) => {
  const exerciseType = exercise.sets[0].reps ? 'REPS' : 'SECS';

  const previous = (set.weight ? set.weight.toString() : 'n/a');
  
  return {
    name: exercise.name,
    color: exercise.color,
    type: exerciseType,
    sets: exercise.sets.map((set) => ({
      prevWeight: /*set.weight && set.weight.toString()*/previous,
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
  const { route: { params: { workoutId } } } = props;

  // get the workout details from redux based on workoutid
  console.log(`Opening Log Workout for workout id ${workoutId}`);

  const exerciseStore = useSelector((state) => state.exercises.exercises);
  const workouts = useSelector((state) => state.workouts.workouts);
  const selectedWorkout = _.find(workouts, (workout) => workout.id === workoutId);

  const { name } = selectedWorkout;

  const exercises = selectedWorkout.exercises.map((exerciseObj, index) => {
    const matchingExercise = _.find(exerciseStore, (exercise) => exerciseObj.exerciseId === exercise.id);

    if(!matchingExercise) { console.log(exerciseObj); console.log(exerciseStore); }
    return {
      ...exerciseObj,
      name: matchingExercise.name,
      color: COLORS[index % 3],
    };
  });

  const navigation = useNavigation();
  const initialExerciseState = parseExercises(exercises);

  const [exerciseState, setExerciseState] = useState(initialExerciseState);

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
        // TODO: Update Redux and database
        navigation.goBack();
      }}
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
  route: PropTypes.shape({
    params: PropTypes.shape({
      workoutId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default LogWorkout;
