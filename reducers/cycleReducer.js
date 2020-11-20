import { INITIALIZE_CYCLES, INCREMENT_SELECTED_CYCLE_INDEX, DECREMENT_SELECTED_CYCLE_INDEX, SET_SELECTED_CYCLE_DETAILS, ADD_CYCLE, DELETE_CYCLE, SELECT_NEW_CYCLE } from '../constants/index';
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
      case ADD_CYCLE:
         console.log(`Adding new cycle ${action.cycle}`);
         const newCycle = [...state.cycles];
         newCycle.push(action.cycle);
         return {
            ...state,
            cycles: newCycle,
         };
      case DELETE_CYCLE:
         console.log(`Deleting cycle ${action.cycleId}`);
         const postDeleteCycle = state.cycles.filter((cycle) => cycle.id !== action.cycleId);
         return {
            ...state,
            cycles: postDeleteCycle,
         }
      case SELECT_NEW_CYCLE:
         console.log(`Setting selected Cycle to ${action.cycleId}`);
         return {
            ...state,
            selectedCycleId: action.cycleId,
            selectedCycleIndex: 0,
         }
      default:
         return state;
   }
}

export default cycleReducer;