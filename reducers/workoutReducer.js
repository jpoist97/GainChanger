import { ADD_WORKOUT, INITIALIZE_WORKOUTS, DELETE_WORKOUT, UPDATE_WORKOUT_PREV } from '../constants/index';

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
         newWorkouts.map((workoutEle) => {
            console.log(workoutEle.id)
         })
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
      case UPDATE_WORKOUT_PREV:
         console.log(`Updating workout's prev details in store ${action.workout.workoutId}`);
         return {
            workouts: state.workouts.map((workoutEle) => {
               if (workoutEle.id == action.workout.workoutId) {
                  console.log('boi');
                  return {
                     workoutEle, 
                  }
               } 
               else {
                  return workoutEle;
               }
            }),
         }
      default:
         return state;
   }
}

export default workoutReducer;