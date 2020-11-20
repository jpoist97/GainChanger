import { ADD_WORKOUT, INITIALIZE_WORKOUTS, DELETE_WORKOUT } from '../constants/index';

const initialState = {
   workouts: [],
}

const workoutReducer = (state = initialState, action) => {
   switch(action.type) {
      case INITIALIZE_WORKOUTS:
         console.log('Initializing workouts store');
         return {
            workouts: [...action.workouts],
         };
      case ADD_WORKOUT:
         console.log(`Adding workout to store with ${action.workout}`);
         const newWorkouts = [...state.workouts];
         newWorkouts.push(action.workout);
         return {
            workouts: newWorkouts,
         };
      case DELETE_WORKOUT:
         console.log(`Deleting workout with ID ${action.workoutId}`);
         const postDeleteWorkout = state.workouts.filter((workout) => workout.id !== action.workoutId);
         return {
            workouts: postDeleteWorkout,
         }
      default:
         return state;
   }
}

export default workoutReducer;