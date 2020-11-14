import { ADD_WORKOUT, INITIALIZE_WORKOUTS } from '../constants/index';

const initialState = {
   workouts: [],
}

const workoutReducer = (state = initialState, action) => {
   switch(action.type) {
      case INITIALIZE_WORKOUTS:
         console.log('Initializing workouts store');
         console.log(action.workouts);
         return {
            workouts: [...action.workouts]
         };
      case ADD_WORKOUT:
         console.log(`Adding workout to store with ${action.workout}`);
         const newWorkouts = [...state.workouts];
         newWorkouts.push(action.workout);
         return {
            workouts: newWorkouts
         };
      default:
         return state;
   }
}

export default workoutReducer;