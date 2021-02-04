import { AntDesign } from '@expo/vector-icons';
import * as React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import * as firebase from 'firebase';
import _ from 'lodash';
import FinishButton from '../utils/FinishButton';
import PlusButton from '../utils/PlusButton';
import AdjustExercisesList from './AdjustExercisesList';
import actions from '../../actions/index';
import { COLORS } from '../../constants/index';

const TitleTextInput = styled.TextInput`
  position: absolute;
  font-family: 'Montserrat_600SemiBold';
  font-size: 24px;
  margin: 15px 12%;
  width: 46%;
  borderBottomWidth: 1px;
  padding: 2px;
`;

const BackButton = styled.TouchableOpacity`
  font-size: 24px;
  margin: 17px 2%;
`;

const AddFinishButton = styled(FinishButton)`
  position: absolute;
  top: 15px;
  right: 20px;
`;

const AddCycleButton = styled(PlusButton)`
   position: absolute;
   bottom: 20px;
   right: 25px;
`;

const getExercise = (exercises, exerciseId) => _.find(exercises, (exercise) => exercise.id === exerciseId);

const parseItemStateToWorkout = (itemState) => {
  // Get two unique muscleGroups
  const allMuscleGroups = itemState.map((item) => item.muscleGroups);
  const workoutMuscleGroups = _.uniq(allMuscleGroups);
  const topMuscleGroups = workoutMuscleGroups.slice(0, 2).join(' ');

  return {
    muscleGroups: topMuscleGroups,
    exercises: itemState.map((item) => {
      const setArr = [];
      const sets = item.sets || 3;
      for (let i = 0; i < sets; i += 1) {
        if (item.isReps) {
          setArr.push({ weight: null, reps: item.reps || 10 });
        } else {
          setArr.push({ weight: null, time: item.seconds || 60 });
        }
      }
      return {
        sets: setArr,
        exerciseId: item.id,
      };
    }),
  };
};

export default ({ navigation, route }) => {
  const isEditing = _.get(route, ['params', 'editing'], false);
  const editWorkout = _.get(route, ['params', 'editWorkout'], undefined);

  const exercises = useSelector((state) => state.exercises.exercises);

  const parseWorkoutExercises = (exercise, index) => {
    const reps = _.get(exercise, ['sets', '0', 'reps'], '').toString();
    const seconds = _.get(exercise, ['sets', '0', 'time'], '').toString();

    const matchingExercise = getExercise(exercises, exercise.exerciseId);

    return {
      color: COLORS[index % COLORS.length],
      id: exercise.exerciseId,
      name: matchingExercise.name,
      muscleGroups: matchingExercise.muscleGroups,
      sets: exercise.sets.length.toString(),
      reps,
      seconds,
      isReps: !!reps,
    };
  };

  const [name, setName] = React.useState(_.get(editWorkout, ['name'], ''));
  const [itemState, setItemState] = React.useState(editWorkout ? editWorkout.exercises.map(parseWorkoutExercises) : []);
  const dispatch = useDispatch();

  const setReps = (index) => (reps) => {
    const newItemState = [...itemState];
    newItemState[index].reps = reps;
    setItemState(newItemState);
  };

  const setSets = (index) => (sets) => {
    const newItemState = [...itemState];
    newItemState[index].sets = sets;
    setItemState(newItemState);
  };

  const setSeconds = (index) => (seconds) => {
    const newItemState = [...itemState];
    newItemState[index].seconds = seconds;
    setItemState(newItemState);
  };

  const toggleType = (index) => () => {
    const newItemState = [...itemState];
    newItemState[index].isReps = !newItemState[index].isReps;
    setItemState(newItemState);
  };

  const removeExercise = (index) => () => {
    const newItemState = [...itemState];
    newItemState.splice(index, 1);
    setItemState(newItemState);
  };

  const onExercisesAdd = (selectedExercises) => {
    const newItems = [...itemState];
    // For now all exercises will default to reps based exercises
    newItems.push(...selectedExercises.map((exercise) => ({ ...exercise, isReps: true })));
    const newExercise = newItems.map((item, index) => ({
      ...item,
      color: COLORS[index % COLORS.length],
    }));
    setItemState(newExercise);
  };

  function updateOrder(exerciseList) {
    setItemState(exerciseList);
  }

  const createNewWorkout = async (newWorkout) => {
    const currentUser = firebase.auth().currentUser.uid;

    const workoutRef = firebase.firestore()
      .collection('users')
      .doc(currentUser)
      .collection('workouts');

    const workoutDoc = await workoutRef.add(newWorkout);

    dispatch(actions.workouts.addWorkout({
      ...newWorkout,
      id: workoutDoc.id,
    }));

    navigation.goBack();
  };

  return (
    <View style={{ height: '100%' }}>
      <View>
        <BackButton onPress={() => navigation.navigate('Workouts')}>
          <AntDesign name="left" size={30} color="black" />
        </BackButton>
        <TitleTextInput
          style={{ borderColor: name ? 'transparent' : 'black' }}
          onChangeText={(newName) => setName(newName)}
          value={name}
          placeholder="Workout Name"
        />

      </View>
      <AddFinishButton onPress={() => {
        if (!name) {
          alert('Please enter a workout name.');
        } else if (itemState.length === 0) {
          alert('Please add at least one exercise.');
        } else if (!itemState.every((exercise) => {
          // If sets is defined make sure it's greater than 0, otherwise if
          // its undefined then we'll default to 3 so it's good to pass.
          if (exercise.sets) {
            return parseInt(exercise.sets) > 0;
          }
          return true;
        })) {
          alert('Exercises must have at least 1 set.');
        } else {
          const parsedItemState = parseItemStateToWorkout(itemState);

          if (isEditing) {
            dispatch(actions.workouts.updateWorkout(editWorkout.id, {
              ...parsedItemState,
              name,
            }));

            navigation.goBack();
          } else {
            createNewWorkout({
              ...parsedItemState,
              name,
              lastPerformed: 'n/a',
            });
          }
        }
      }}
      />
      <AdjustExercisesList items={itemState} setSets={setSets} setSeconds={setSeconds} setReps={setReps} toggleType={toggleType} removeExercise={removeExercise} updateOrder={updateOrder} />
      <AddCycleButton title="Exercise" size={18} onPress={() => { navigation.navigate('Add Exercises', { onExercisesAdd }); }} />
    </View>
  );
};
