import { ADD_WORKOUT_RECORD } from '../constants/index';

const addWorkoutRecord = (record, date) => {
    return {
        type: ADD_WORKOUT_RECORD,
        record,
        date,
    }
}

export default {
   addWorkoutRecord,
};