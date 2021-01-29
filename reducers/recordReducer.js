import { INITIALIZE_RECORDS, ADD_WORKOUT_RECORD } from '../constants/index';

const initialState = {
   records: [],
}

const recordReducer = (state = initialState, action) => {
   switch(action.type) {
        case INITIALIZE_RECORDS:
            console.log('Adding workout record');
            return {
                records: [...action.records]
            };
        case ADD_WORKOUT_RECORD:
            console.log(`Adding workout to store with ${action.record}`);
            const newRecords = [...state.records];
            newRecords.push(action.record)
            return {
                records: newRecords,
            };
        default:
            return state;
   }
}

export default recordReducer;