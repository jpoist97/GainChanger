import * as React from 'react';
import { useSelector } from 'react-redux';
import ExerciseList from './ExerciseList';
import ModalScreenWrapper from '../utils/ModalScreenWrapper';

export default ({ route }) => {
  const exercises = useSelector((state) => state.exercises.exercises);
  const exerciseObjects = exercises.map((exercise) => ({ ...exercise, subtext: exercise.muscleGroups }));

  const parseItemsByName = (items) => {
    // Sort names alphabetically
    items.sort((a, b) => a.name.localeCompare(b.name));

    // Group by first letter of each name
    const bucketData = items.reduce((accumulator, item) => {
      const bucket = item.name[0].toUpperCase();

      // If this is the first time we've seen this letter, create a bucket
      if (!accumulator[bucket]) {
        accumulator[bucket] = [item];
      } else {
        accumulator[bucket].push(item);
      }
      return accumulator;
    }, {});
    return bucketData;
  };

  const parseItemsByMuscleGroup = (items) => {
    // Sort by muscle group
    items.sort((a, b) => a.muscleGroups.localeCompare(b.muscleGroups));
    const bucketData = items.reduce((accumulator, item) => {
      const bucket = item.muscleGroups;
      if (!accumulator[bucket]) {
        accumulator[bucket] = [item];
      } else {
        accumulator[bucket].push(item);
      }
      return accumulator;
    }, {});

    // Sort by name within each muscle group
    Object.keys(bucketData).forEach((key) => {
      bucketData[key].sort((a, b) => a.name.localeCompare(b.name));
    });
    return bucketData;
  };

  return (
    <ModalScreenWrapper>
      <ExerciseList
        onExercisesAdd={route.params.onExercisesAdd}
        parsedItemsName={parseItemsByName(exerciseObjects)}
        parsedItemsMuscleGroups={parseItemsByMuscleGroup(exerciseObjects)}
      />
    </ModalScreenWrapper>
  );
};
