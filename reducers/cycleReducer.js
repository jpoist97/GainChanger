import { INITIALIZE_CYCLES, INCREMENT_SELECTED_CYCLE_INDEX, DECREMENT_SELECTED_CYCLE_INDEX, SET_SELECTED_CYCLE_DETAILS } from '../constants/index';
import _ from 'lodash';

const initialState = {
   cycles: [],
   selectedCycleId: undefined,
   selectedCycleIndex: undefined,
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
      case INCREMENT_SELECTED_CYCLE_INDEX:
         console.log('advancing selected cycle');
         return {
            ...state,
            selectedCycleIndex: (state.selectedCycleIndex + 1) % action.cycleLength,
         };
      case DECREMENT_SELECTED_CYCLE_INDEX:
         console.log('decrementing selected cycle');
         return {
            ...state,
            selectedCycleIndex: state.selectedCycleIndex === 0 ? action.cycleLength - 1 : state.selectedCycleIndex - 1,
         };
      default:
         return state;
   }
}

export default cycleReducer;