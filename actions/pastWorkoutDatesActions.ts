import { INITIALIZE_DATES, ADD_WORKOUT_RECORD_DATE } from '../constants/index';

const initializeRecordDates = (dates) => {
   return {
      type: INITIALIZE_DATES,
      dates,
   };
};

const addRecordDate = (date) => {
   return {
      type: ADD_WORKOUT_RECORD_DATE,
      date,
   };
};

export default {
   initializeRecordDates,
   addRecordDate,
};
