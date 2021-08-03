import {
   COMPLETE_WORKOUT_LOAD,
   COMPLETE_CYCLE_LOAD,
   COMPLETE_EXERCISE_LOAD,
   RESET_LOAD_STORE,
} from '../constants/index';

const initialState = {
   cyclesLoaded: false,
   workoutsLoaded: false,
   exercisesLoaded: false,
};

const loadingReducer = (state = initialState, action) => {
   switch (action.type) {
      case COMPLETE_CYCLE_LOAD:
         return {
            ...state,
            cyclesLoaded: true,
         };
      case COMPLETE_WORKOUT_LOAD:
         return {
            ...state,
            workoutsLoaded: true,
         };
      case COMPLETE_EXERCISE_LOAD:
         return {
            ...state,
            exercisesLoaded: true,
         };
      case RESET_LOAD_STORE:
         return initialState;
      default:
         return state;
   }
};

export default loadingReducer;
