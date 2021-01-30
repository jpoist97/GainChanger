import { ADD_WORKOUT, INITIALIZE_WORKOUTS, DELETE_WORKOUT, PURGE_WORKOUT, DELETE_CYCLE } from '../constants/index';
import * as api from '../api';

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
   return async (dispatch) => {
      console.log(`DELETING workout ${workoutId}`);
      
      // Delte workout from firestore and redux
      api.deleteWorkoutDocument(workoutId);
      dispatch({
         type: DELETE_WORKOUT,
         workoutId,
      });

      // Use this logic to retreive all cycles that contain the workout we're removing
      const matchingCycleIds = await api.getCycleIdsContainingWorkout(workoutId);

      // Delete the workout from all cycles it was a part of
      dispatch({
         type: PURGE_WORKOUT,
         cycleIds: matchingCycleIds,
         workoutId,
      });
      const cyclesToDelete = await api.purgeWorkoutFromCycles(workoutId, matchingCycleIds);

      // Delete all cycles that now have no workouts in them
      cyclesToDelete.forEach((cycleId) => {
         api.deleteCycleDocument(cycleId);
         dispatch({
            type: DELETE_CYCLE,
            cycleId,
         });
      });
   }
}

const updateWorkoutPrev = (workoutId, updatedExercises) => {
   return {
      type: UPDATE_WORKOUT_PREV,
      workoutId,
      updatedExercises
   }
}

export default {
   initializeWorkouts,
   addWorkout,
   deleteWorkout,
   updateWorkoutPrev,
};