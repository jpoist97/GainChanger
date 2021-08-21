import {
   INITIALIZE_EXERCISES,
   ADD_CUSTOM_EXERCISE,
   COMPLETE_EXERCISE_LOAD,
} from '../constants/index';
import * as api from '../api';

const initalizeExercises = () => {
   return async (dispatch) => {
      const exercises = await api.fetchExercises();

      dispatch({
         type: INITIALIZE_EXERCISES,
         exercises,
      });

      dispatch({
         type: COMPLETE_EXERCISE_LOAD,
      });
   };
};

const addCustomExercise = (exercise) => {
   return (dispatch) => {
      console.log('Adding custom Exercise');

      dispatch({
         type: ADD_CUSTOM_EXERCISE,
         exercise,
      });
   };
};

export default {
   initalizeExercises,
   addCustomExercise,
};
