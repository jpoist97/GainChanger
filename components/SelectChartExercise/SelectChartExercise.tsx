import * as React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ExerciseList from './ExerciseList';
import ModalScreenWrapper from '../utils/ModalScreenWrapper';

const SelectChartExercise = ({ route }) => {
   const { onExerciseSelect, selectedExerciseId } = route.params;

   const exercises = useSelector((state) => state.exercises.exercises);
   const exerciseObjects = exercises.map((exercise) => ({
      ...exercise,
      subtext: exercise.muscleGroups,
   }));

   const parseItemsByName = (items) => {
      // Sort names alphabetically
      items.sort((a, b) => a.name.localeCompare(b.name));
      console.log(items[0].id);

      // Group by first letter of each name
      const bucketData = items.reduce((accumulator, item) => {
         const bucket = item.name[0].toUpperCase();
         const parsedItem = item;

         if (selectedExerciseId && parsedItem.id === selectedExerciseId) {
            // eslint-disable-next-line no-param-reassign
            parsedItem.selected = true;
         }

         // If this is the first time we've seen this letter, create a bucket
         if (!accumulator[bucket]) {
            accumulator[bucket] = [parsedItem];
         } else {
            accumulator[bucket].push(parsedItem);
         }
         return accumulator;
      }, {});
      return bucketData;
   };

   return (
      <ModalScreenWrapper>
         <ExerciseList
            onExerciseSelect={onExerciseSelect}
            parsedItems={parseItemsByName(exerciseObjects)}
            exerciseObjects={exerciseObjects}
         />
      </ModalScreenWrapper>
   );
};

SelectChartExercise.propTypes = {
   route: PropTypes.shape({
      params: PropTypes.shape({
         onExerciseSelect: PropTypes.func.isRequired,
         selectedExerciseId: PropTypes.string,
      }),
   }).isRequired,
};

export default SelectChartExercise;
