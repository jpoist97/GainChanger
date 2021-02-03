import * as React from 'react';
import { useSelector } from 'react-redux';
import ExerciseList from './ExerciseList';
import ModalScreenWrapper from '../utils/ModalScreenWrapper';

export default ({ route }) => {
  const exercises = useSelector((state) => state.exercises.exercises);
  const items = exercises.map((exercise) => ({ ...exercise, subtext: exercise.muscleGroups }));
  const [isSortByMuscleGroup, setIsSortByMuscleGroup] = React.useState(false);

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
      if(!accumulator[bucket]) {
        accumulator[bucket] = [item];
      } else {
        accumulator[bucket].push(item);
      }
      return accumulator;
    }, {});
  
    // Sort by name within each muscle group
    for (let muscle in bucketData) {
      bucketData[muscle].sort((a, b) => a.name.localeCompare(b.name));
    };
    return bucketData;
  };

  return (
    <ModalScreenWrapper>
      <ExerciseList 
        items={isSortByMuscleGroup ? parseItemsByMuscleGroup(items) : parseItemsByName(items)} 
        onExercisesAdd={route.params.onExercisesAdd}
        isSortByMuscleGroup = {isSortByMuscleGroup}
        setIsSortByMuscleGroup = {setIsSortByMuscleGroup} 
      />
    </ModalScreenWrapper>
  );
};
