import { INITIALIZE_RECORDS, ADD_WORKOUT_RECORD } from '../constants/index';

const initializeRecords = (records) => {
   return {
      type: INITIALIZE_RECORDS,
      records,
   }
}

const addRecord = (record) => {
    return {
        type: ADD_WORKOUT_RECORD,
        record,
    }
}

export default {
   initializeRecords,
   addRecord,
};