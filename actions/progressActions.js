import {
   UPDATE_USER_PROGRESS,
   SET_EXERCISE_RECORDS,
   START_LOADING_EXERCISE_RECORDS,
   ADD_NEW_EXERCISE_RECORDS,
} from '../constants/index';
import {
   updateUserProgress,
   retrieveExerciseRecords,
   postExerciseRecords,
} from '../api';

const initalizeProgressStore = (
   totalWeightLifted,
   totalWorkoutsPerformed,
   weightPersonalRecord
) => {
   return {
      type: UPDATE_USER_PROGRESS,
      totalWeightLifted,
      totalWorkoutsPerformed,
      weightPersonalRecord,
   };
};

const updateProgressStats = (
   totalWeightLifted,
   totalWorkoutsPerformed,
   weightPersonalRecord
) => {
   return async (dispatch) => {
      updateUserProgress(
         totalWeightLifted,
         totalWorkoutsPerformed,
         weightPersonalRecord
      );

      dispatch({
         type: UPDATE_USER_PROGRESS,
         totalWeightLifted,
         totalWorkoutsPerformed,
         weightPersonalRecord,
      });
   };
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
      });
   };
};

const postNewExerciseRecords = (exerciseRecords) => {
   return async (dispatch) => {
      postExerciseRecords(exerciseRecords);

      dispatch({
         type: ADD_NEW_EXERCISE_RECORDS,
         exerciseRecords,
      });
   };
};

export default {
   initalizeProgressStore,
   updateProgressStats,
   fetchExerciseRecords,
   postNewExerciseRecords,
};
