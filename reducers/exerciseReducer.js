import { INITIALIZE_EXERCISES, ADD_CUSTOM_EXERCISE } from '../constants/index';

const initialState = {
   exercises: [],
}

const exerciseReducer = (state = initialState, action) => {
   switch(action.type) {
      case INITIALIZE_EXERCISES:
         console.log('Initializing exercises store');
         return {
            exercises: [...action.exercises]
         };
      case ADD_CUSTOM_EXERCISE:
        console.log(`Adding custom exercise ${action.exercises.name}`);
        const newExercises = [...state.exercises];
        newExercises.push(action.exercises);
        return {
            ...state,
            exercises: newExercises,
        };
      default:
         return state;
   }
}

export default exerciseReducer;