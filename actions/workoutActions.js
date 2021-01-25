import { ADD_WORKOUT, INITIALIZE_WORKOUTS, DELETE_WORKOUT, UPDATE_WORKOUT_PREV } from '../constants/index';

const initializeWorkouts = (workouts) => {
   return {
      type: INITIALIZE_WORKOUTS,
      workouts,
   }
}

const addWorkout = (workout) => {
   return {
      type: ADD_WORKOUT,
      workout,
   }
}

const deleteWorkout = (workoutId) => {
   return {
      type: DELETE_WORKOUT,
      workoutId,
   }
}

const updateWorkoutPrev = (workout, workoutId) => {
   return {
      type: UPDATE_WORKOUT_PREV,
      workout,
      workoutId,
   }
}

export default {
   initializeWorkouts,
   addWorkout,
   deleteWorkout,
   updateWorkoutPrev,
};