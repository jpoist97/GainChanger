import { INITIALIZE_USER_PROGRESS, UPDATE_USER_PROGRESS } from '../constants/index';
import { updateUserProgress } from '../api';

const initalizeProgressStore = (totalWeightLifted, totalWorkoutsPerformed, weightPersonalRecord) => {
   return {
      type: INITIALIZE_USER_PROGRESS,
      totalWeightLifted,
      totalWorkoutsPerformed,
      weightPersonalRecord,
   }
};

const updateProgressStats = (totalWeightLifted, totalWorkoutsPerformed, weightPersonalRecord) => {
   return async (dispatch) =>{
      updateUserProgress(totalWeightLifted, totalWorkoutsPerformed, weightPersonalRecord);

      dispatch({
         type: UPDATE_USER_PROGRESS,
         totalWeightLifted,
         totalWorkoutsPerformed,
         weightPersonalRecord,
      });
   } 
};

export default {
   initalizeProgressStore,
   updateProgressStats,
};