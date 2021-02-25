import { ADD_WORKOUT_RECORD } from '../constants/index';

const initialState = {
   records: {},
}

const recordReducer = (state = initialState, action) => {
   switch(action.type) {
        case ADD_WORKOUT_RECORD:
            console.log(`Adding workout record to store with name: ${action.record.exerciseName}`);
            const record = action.record;
            const date = action.date;
            const prevRecords = {...state.records};
            if (prevRecords[date]) {
                prevRecords[date] = [...prevRecords[date], record];
            } else {
                prevRecords[date] = [record];
            }
            return {
                records: prevRecords,
            };
        default:
            return state;
   }
}

export default recordReducer;
