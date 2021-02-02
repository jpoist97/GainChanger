import { ADD_WORKOUT, INITIALIZE_WORKOUTS, DELETE_WORKOUT, UPDATE_WORKOUT, UPDATE_WORKOUT_PREV } from '../constants/index';

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
      case UPDATE_WORKOUT:
         console.log(`Updating workout with ID ${action.workoutId}`);

         const updatedWorkouts = state.workouts.map((workout) => {
            if(workout.id === action.workoutId) {
               return {
                  ...action.newWorkoutContent,
                  id: action.workoutId,
               };
            } else {
               return workout;
            }
         });
         return {
            workouts: updatedWorkouts
         };
      case UPDATE_WORKOUT_PREV:
         console.log(`Updating workout's prev details in store ${action.workoutId}`);
         const updatedWorkoutList = state.workouts.map((workoutEle) => {
            if (workoutEle.id == action.workoutId) {
               return {
                  ...workoutEle,
                  exercises: action.updatedExercises,
                  lastPerformed: 0,
               };
            } 
            else {
               return workoutEle;
            }
         });
         return {
            workouts: updatedWorkoutList
         }
         
      default:
         return state;
   }
}

export default workoutReducer;