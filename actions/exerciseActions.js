import { INITIALIZE_EXERCISES, ADD_CUSTOM_EXERCISE } from '../constants/index';

const initalizeExercises = (exercises) => {
   return {
      type: INITIALIZE_EXERCISES,
      exercises,
   }
}

const addCustomExercise = (exercise) => {
  return (dispatch) => {
    console.log('Adding custom Exercise')

    dispatch({
     type: ADD_CUSTOM_EXERCISE,
     exercise,
    });
  }
}

export default {
   initalizeExercises,
   addCustomExercise
};