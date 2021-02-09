import { INITIALIZE_USER_PROGRESS, UPDATE_USER_PROGRESS } from '../constants/index';

const initialState = {
   profileStats: {
      totalWeightLifted: 0,
      totalWorkoutsPerformed: 0,
      weightPersonalRecord: 0,
   },
   exerciseRecords: {},
}

const progressReducer = (state = initialState, action) => {
   switch(action.type) {
        case INITIALIZE_USER_PROGRESS:
            console.log(`Initializing progress store`);

            return {
               ...state,
               profileStats: {
                  totalWeightLifted: action.totalWeightLifted,
                  totalWorkoutsPerformed: action.totalWorkoutsPerformed,
                  weightPersonalRecord: action.weightPersonalRecord,
               }
            };
         case UPDATE_USER_PROGRESS:
            console.log(`Updating progress store`);

            return {
               ...state,
               profileStats: {
                  totalWeightLifted: action.totalWeightLifted,
                  totalWorkoutsPerformed: action.totalWorkoutsPerformed,
                  weightPersonalRecord: action.weightPersonalRecord,
               }
            };
        default:
            return state;
   }
}

export default progressReducer;