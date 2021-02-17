import { INITIALIZE_EXERCISES, ADD_CUSTOM_EXERCISE } from '../constants/index';

const initalizeExercises = (exercises) => {
   return {
      type: INITIALIZE_EXERCISES,
      exercises,
   }
}

const addCustomExercise = (exercises) => {
  return {
     type: ADD_CUSTOM_EXERCISE,
     exercises,
  }
}


export default {
   initalizeExercises,
   addCustomExercise
};