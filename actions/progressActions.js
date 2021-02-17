import { INITIALIZE_USER_PROGRESS, UPDATE_USER_PROGRESS, SET_EXERCISE_RECORDS, START_LOADING_EXERCISE_RECORDS } from '../constants/index';
import { updateUserProgress, retrieveExerciseRecords, postExerciseRecords, } from '../api';

const initalizeProgressStore = (totalWeightLifted, totalWorkoutsPerformed, weightPersonalRecord) => {
   return {
      type: INITIALIZE_USER_PROGRESS,
      totalWeightLifted,
      totalWorkoutsPerformed,
      weightPersonalRecord,
   }
};

const updateProgressStats = (totalWeightLifted, totalWorkoutsPerformed, weightPersonalRecord) => {
   return async (dispatch) => {
      updateUserProgress(totalWeightLifted, totalWorkoutsPerformed, weightPersonalRecord);

      dispatch({
         type: UPDATE_USER_PROGRESS,
         totalWeightLifted,
         totalWorkoutsPerformed,
         weightPersonalRecord,
      });
   } 
};

const fetchExerciseRecords = (exerciseId) => {
   return async (dispatch) => {
      dispatch({
         type: START_LOADING_EXERCISE_RECORDS,
      });

      const exerciseRecords = await retrieveExerciseRecords(exerciseId);

      dispatch({
         type: SET_EXERCISE_RECORDS,
         exerciseId, 
         exerciseRecords,
      })
   }
}

export default {
   initalizeProgressStore,
   updateProgressStats,
   fetchExerciseRecords,
};