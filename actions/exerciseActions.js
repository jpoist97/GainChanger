import { INITIALIZE_EXERCISES } from '../constants/index';

const initalizeExercises = (exercises) => {
   return {
      type: INITIALIZE_EXERCISES,
      exercises,
   }
}

export default {
   initalizeExercises,
};