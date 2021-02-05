import { ADD_WORKOUT_RECORD } from '../constants/index';

const addWorkoutRecord = (record) => {
    return {
        type: ADD_WORKOUT_RECORD,
        record,
    }
}

export default {
   addWorkoutRecord,
};