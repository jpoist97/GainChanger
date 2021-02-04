import { 
   ADD_WORKOUT, 
   INITIALIZE_WORKOUTS, 
   DELETE_WORKOUT, 
   PURGE_WORKOUT, 
   DELETE_CYCLE, 
   UPDATE_WORKOUT, 
   UPDATE_WORKOUT_EXERCISES 
} from '../constants/index';
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

/**
 * Action that deletes a given workout from redux and Firebase and also removes
 * it from each cycle the workout is included in. Workout is specified by 
 * workoutId.
 * 
 * @param {String} workoutId 
 */
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

/**
 * Action that updates the entire workout object of a given workout in redux
 * and Firebase. Workout that is updated is specified by workoutId.
 * 
 * @param {String} workoutId 
 * @param {Workout} newWorkoutContent 
 */
const updateWorkout = (workoutId, newWorkoutContent) => {
   return (dispatch) => {
      console.log(`Updating workout ${workoutId}`);

      api.updateWorkoutDocument(workoutId, newWorkoutContent);
      dispatch({
         type: UPDATE_WORKOUT,
         workoutId,
         newWorkoutContent,
      });
   }
}

/**
 * Action that updates just the exercises property of a given workout in redux.
 * Workout that is updated is specified by workoutId. This action does not
 * update Firestore.
 * 
 * @param {String} workoutId 
 * @param {Array<Exercise>} updatedExercises 
 */
const updateWorkoutExercises = (workoutId, updatedExercises) => {
   return {
      type: UPDATE_WORKOUT_EXERCISES,
      workoutId,
      updatedExercises
   }
}

export default {
   initializeWorkouts,
   addWorkout,
   deleteWorkout,
   updateWorkout,
   updateWorkoutExercises,
};