import { ADD_WORKOUT } from '../constants/index';

export function addWorkout(workout) {
   return {
      type: ADD_WORKOUT,
      payload: workout,
   }
}