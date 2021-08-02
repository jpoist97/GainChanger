import {
   INITIALIZE_CYCLES,
   SET_SELECTED_CYCLE_INDEX,
   ADD_CYCLE,
   UPDATE_CYCLE,
   DELETE_CYCLE,
   SELECT_NEW_CYCLE,
   COMPLETE_CYCLE_LOAD,
} from '../constants/index';
import * as api from '../api';

const initializeCycles = (selectedCycleId, selectedCycleIndex) => {
   return async (dispatch) => {
      const cycles = await api.fetchCycles();

      dispatch({
         type: INITIALIZE_CYCLES,
         cycles,
         selectedCycleId,
         selectedCycleIndex,
      });

      dispatch({
         type: COMPLETE_CYCLE_LOAD,
      });
   };
};

const incrementSelectedCycleIndex = (currentIndex, selectedCycleLength) => {
   return (dispatch) => {
      const newSelectedCycleIndex = (currentIndex + 1) % selectedCycleLength;

      api.updateSelectedCycleIndex(newSelectedCycleIndex);

      dispatch({
         type: SET_SELECTED_CYCLE_INDEX,
         selectedCycleIndex: newSelectedCycleIndex,
      });
   };
};

const decrementSelectedCycleIndex = (currentIndex, selectedCycleLength) => {
   return (dispatch) => {
      const newSelectedCycleIndex =
         currentIndex === 0 ? selectedCycleLength - 1 : currentIndex - 1;

      api.updateSelectedCycleIndex(newSelectedCycleIndex);

      dispatch({
         type: SET_SELECTED_CYCLE_INDEX,
         selectedCycleIndex: newSelectedCycleIndex,
      });
   };
};

const addCycle = (cycle) => {
   return {
      type: ADD_CYCLE,
      cycle,
   };
};

const updateCycle = (cycleId, newCycleContent) => {
   return {
      type: UPDATE_CYCLE,
      cycleId,
      newCycleContent,
   };
};

const deleteCycle = (cycleId) => {
   return {
      type: DELETE_CYCLE,
      cycleId,
   };
};

const selectCycle = (cycleId) => {
   return {
      type: SELECT_NEW_CYCLE,
      cycleId,
   };
};

export default {
   initializeCycles,
   incrementSelectedCycleIndex,
   decrementSelectedCycleIndex,
   addCycle,
   updateCycle,
   deleteCycle,
   selectCycle,
};
