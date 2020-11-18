import * as React from 'react';
import ExerciseList from './ExerciseList';
import ModalScreenWrapper from '../utils/ModalScreenWrapper';

export default ({ route }) => {
  const items = [
    {
      name: 'Bicep Curls', subtext: 'Biceps',
    },
    {
      name: 'Barbell Curls', subtext: 'Biceps',
    },
    {
      name: 'Deadlifts', subtext: 'Back',
    },
    {
      name: 'Bench Press', subtext: 'Chest',
    },
    {
      name: 'Lateral Pulldowns', subtext: 'Back Biceps',
    },
    {
      name: 'Row Machine', subtext: 'Full Body',
    },
    {
      name: 'Pull Ups', subtext: 'Back',
    },
    {
      name: 'Low Rows', subtext: 'Back',
    },
    {
      name: 'Squats', subtext: 'Quads Glutes',
    },
    {
      name: 'Leg Press', subtext: 'Quads Glutes',
    },
    {
      name: 'Calf Raises', subtext: 'Calves',
    },
    {
      name: 'Leg Extension', subtext: 'Quads Glutes',
    },
    {
      name: 'Hip Adductor', subtext: 'Glutes',
    },
    {
      name: 'Chest Fly', subtext: 'Chest',
    },
    {
      name: 'Push Up', subtext: 'Chest Biceps',
    },
    {
      name: 'Bent Over Row', subtext: 'Lats Trapezius',
    },
    {
      name: 'Shoulder Press', subtext: 'Trapezius Deltoids',
    },
  ];
  return (
    <ModalScreenWrapper>
      <ExerciseList items={items} onExercisesAdd={route.params.onExercisesAdd} />
    </ModalScreenWrapper>
  );
};
