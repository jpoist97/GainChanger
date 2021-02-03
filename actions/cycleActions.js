import { INITIALIZE_CYCLES, INCREMENT_SELECTED_CYCLE_INDEX, DECREMENT_SELECTED_CYCLE_INDEX, SET_SELECTED_CYCLE_DETAILS, ADD_CYCLE, UPDATE_CYCLE, DELETE_CYCLE, SELECT_NEW_CYCLE } from '../constants/index';

const initializeCycles = (cycles, selectedCycleId, selectedCycleIndex) => {
   return {
      type: INITIALIZE_CYCLES,
      cycles,
      selectedCycleId,
      selectedCycleIndex,
   };
};

const incrementSelectedCycleIndex = (selectedCycleLength) => {
   return {
      type: INCREMENT_SELECTED_CYCLE_INDEX,
      cycleLength: selectedCycleLength,
   }
}

const decrementSelectedCycleIndex = (selectedCycleLength) => {
   return {
      type: DECREMENT_SELECTED_CYCLE_INDEX,
      cycleLength: selectedCycleLength,
   }
}

const addCycle = (cycle) => {
   return {
      type: ADD_CYCLE,
      cycle,
   }
}

const updateCycle = (cycleId, newCycleContent) => {
  return {
      type: UPDATE_CYCLE,
      cycleId,
      newCycleContent,
  }
}

const deleteCycle = (cycleId) => {
   return {
      type: DELETE_CYCLE,
      cycleId,
   }
}

const selectCycle = (cycleId) => {
   return {
      type: SELECT_NEW_CYCLE,
      cycleId,
   }
}

export default {
   initializeCycles,
   incrementSelectedCycleIndex,
   decrementSelectedCycleIndex,
   addCycle,
   updateCycle,
   deleteCycle,
   selectCycle,
};