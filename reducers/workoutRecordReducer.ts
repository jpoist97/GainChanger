import { ADD_WORKOUT_RECORD } from '../constants/index';
import { WorkoutRecord } from '../types/common';

// interface WorkoutRecordAction {
//    type:
// }

interface WorkoutRecordState {
   records: {
      [key: string]: WorkoutRecord;
   };
}

const initialState = {
   records: {},
};

const recordReducer = (state = initialState, action) => {
   switch (action.type) {
      case ADD_WORKOUT_RECORD:
         console.log(
            `Adding workout record to store with name: ${action.record.workoutName}`
         );
         const record = action.record;
         const date = action.date;
         const prevRecords = { ...state.records };
         if (prevRecords[date]) {
            prevRecords[date] = [...prevRecords[date], record];
         } else {
            prevRecords[date] = [record];
         }
         return {
            ...state,
            records: prevRecords,
         };
      default:
         return state;
   }
};

export default recordReducer;
