import { UPDATE_USER_PROGRESS, SET_EXERCISE_RECORDS, START_LOADING_EXERCISE_RECORDS, ADD_NEW_EXERCISE_RECORDS } from '../constants/index';
import _ from 'lodash';
import { format, toDate } from 'date-fns';

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
         case UPDATE_USER_PROGRESS:

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
                  [action.exerciseId]: action.exerciseRecords.map((record) => ({ ...record, date: format(toDate(record.date.seconds * 1000), 'MM-dd-yy')})),
               },
               loading: false
            }
         case ADD_NEW_EXERCISE_RECORDS:
            const newExerciseRecords = {...state.exerciseRecords};

            action.exerciseRecords.forEach((record) => {
               if(newExerciseRecords[record.exerciseId]) {
                  newExerciseRecords[record.exerciseId].push({
                     ...record,
                     date: format(new Date(), 'MM-dd-yy'),
                  });
               }
            })

            return {
               ...state,
               exerciseRecords: newExerciseRecords,
            }
        default:
            return state;
   }
}

export default progressReducer;