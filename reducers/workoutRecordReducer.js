import { ADD_WORKOUT_RECORD } from '../constants/index';

const initialState = {
   records: {},
}

const recordReducer = (state = initialState, action) => {
   switch(action.type) {
        case ADD_WORKOUT_RECORD:
            console.log(`Adding workout record to store with name: ${action.record.name}`);
            const {name, sets, date} = action.record;
            const newRecord = {
                "name":name,
                "sets":sets,
            }
            const prevRecords = {...state.records};
            if (prevRecords[date]) {
                const existingRecord = [...prevRecords[date]];
                existingRecord.push(newRecord)
                prevRecords[date] = existingRecord;
            } else {
                prevRecords[date] = [newRecord];
            }
            return {
                records: prevRecords,
            };
        default:
            return state;
   }
}

export default recordReducer;