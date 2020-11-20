import { INITIALIZE_EXERCISES } from '../constants/index';

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
      default:
         return state;
   }
}

export default exerciseReducer;