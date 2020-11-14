import { INITIALIZE_CYCLES } from '../constants/index';

const initialState = {
   cycles: [],
   selectedCycleId: 0,
   selectedCycleIndex: 0,
}

const cycleReducer = (state = initialState, action) => {
   switch(action.type) {
      case INITIALIZE_CYCLES:
         console.log('Initializing cycles store');
         return {
            cycles: [...action.cycles],
            selectedCycleId: action.selectedCycleId,
            selectedCycleIndex: action.selectedCycleIndex,
         };
      default:
         return state;
   }
}

export default cycleReducer;