import { INITIALIZE_USER_PROGRESS, UPDATE_USER_PROGRESS, SET_EXERCISE_RECORDS, START_LOADING_EXERCISE_RECORDS } from '../constants/index';
import _ from 'lodash';

const initialState = {
   profileStats: {
      totalWeightLifted: 0,
      totalWorkoutsPerformed: 0,
      weightPersonalRecord: 0,
   },
   exerciseRecords: {},
   loading: false,
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
         case START_LOADING_EXERCISE_RECORDS:

            return {
               ...state,
               loading: true,
            }
         case SET_EXERCISE_RECORDS:
            console.log(`Setting exercise Records for ${action.exerciseId}`);

            return {
               ...state,
               exerciseRecords: {
                  ...state.exerciseRecords,
                  [action.exerciseId]: action.exerciseRecords,
               },
               loading: false
            }
        default:
            return state;
   }
}

export default progressReducer;