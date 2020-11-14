import { ADD_WORKOUT } from '../constants/index';

const initialState = {
   workouts: [],
}

const workoutReducer = (state = initialState, action) => {
   switch(action.type) {
      case ADD_WORKOUT:
         const newWorkouts = [...state.workouts];
         newWorkouts.push(action.payload);
         return {
            workouts: newWorkouts
         }
      default:
         return state;
   }
}

export default workoutReducer;