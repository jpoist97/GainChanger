import * as React from 'react';
import ExerciseList from './ExerciseList';
import ModalScreenWrapper from '../utils/ModalScreenWrapper';
import { useSelector } from 'react-redux';

export default ({ route }) => {
  const exercises = useSelector((state) => state.exercises.exercises);
  const items = exercises.map((exercise) => ({ ...exercise, subtext: exercise.muscleGroups }))

  return (
    <ModalScreenWrapper>
      <ExerciseList items={items} onExercisesAdd={route.params.onExercisesAdd} />
    </ModalScreenWrapper>
  );
};
