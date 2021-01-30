import { INITIALIZE_DATES, ADD_WORKOUT_RECORD_DATE } from '../constants/index';

const initialState = {
   dates: [],
}

const pastWorkoutDateReducer = (state = initialState, action) => {
   switch(action.type) {
        case INITIALIZE_DATES:
            console.log('Initializing records store');
            return {
                dates: [...action.dates]
            };
        case ADD_WORKOUT_RECORD_DATE:
            console.log(`Adding workout to store with ${action.date}`);
            const newDates = [...state.dates];
            newDates.push(action.date);
            return {
                dates: newDates,
            };
        default:
            return state;
   }
}

export default pastWorkoutDateReducer;