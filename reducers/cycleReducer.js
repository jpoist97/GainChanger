import {
   INITIALIZE_CYCLES,
   SET_SELECTED_CYCLE_INDEX,
   ADD_CYCLE,
   UPDATE_CYCLE,
   DELETE_CYCLE,
   SELECT_NEW_CYCLE,
   PURGE_WORKOUT,
} from '../constants/index';
import _ from 'lodash';

const initialState = {
   cycles: [],
   selectedCycleId: undefined,
   selectedCycleIndex: undefined,
   selectedCycle: undefined,
};

const cycleReducer = (state = initialState, action) => {
   switch (action.type) {
      case INITIALIZE_CYCLES:
         console.log('Initializing cycles store');
         return {
            cycles: [...action.cycles],
            selectedCycleId: action.selectedCycleId,
            selectedCycleIndex: action.selectedCycleIndex,
            selectedCycle: _.find(
               action.cycles,
               (cycle) => cycle.id === action.selectedCycleId
            ),
         };
      case SET_SELECTED_CYCLE_INDEX:
         return {
            ...state,
            selectedCycleIndex: action.selectedCycleIndex,
         };
      case ADD_CYCLE:
         console.log(`Adding new cycle ${action.cycle}`);
         const newCycle = [...state.cycles];
         newCycle.push(action.cycle);
         return {
            ...state,
            cycles: newCycle,
         };
      case UPDATE_CYCLE:
         const updatedCycles = state.cycles.map((cycle) => {
            if (cycle.id === action.cycleId) {
               return {
                  ...cycle,
                  ...action.newCycleContent,
               };
            } else {
               return cycle;
            }
         });
         return {
            ...state,
            cycles: updatedCycles,
         };
      case DELETE_CYCLE:
         console.log(`Deleting cycle ${action.cycleId}`);
         const postDeleteCycle = state.cycles.filter(
            (cycle) => cycle.id !== action.cycleId
         );
         return {
            ...state,
            cycles: postDeleteCycle,
         };
      case SELECT_NEW_CYCLE:
         console.log(`Setting selected Cycle to ${action.cycleId}`);
         return {
            ...state,
            selectedCycleId: action.cycleId,
            selectedCycleIndex: 0,
            selectedCycle: _.find(
               state.cycles,
               (cycle) => cycle.id === action.cycleId
            ),
         };
      case PURGE_WORKOUT:
         console.log(
            `Purging workout ${action.workoutId} from ${action.cycleIds}`
         );
         const purgedCycles = state.cycles.map((cycle) => {
            if (action.cycleIds.includes(cycle.id)) {
               return {
                  ...cycle,
                  workouts: cycle.workouts.filter(
                     (workoutId) => workoutId !== action.workoutId
                  ),
               };
            } else {
               return cycle;
            }
         });

         return {
            ...state,
            cycles: purgedCycles,
         };
      default:
         return state;
   }
};

export default cycleReducer;
