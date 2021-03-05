import cycleReducer from '../../reducers/cycleReducer';
import { 
   INITIALIZE_CYCLES, 
   SET_SELECTED_CYCLE_INDEX, 
   ADD_CYCLE, 
   UPDATE_CYCLE, 
   DELETE_CYCLE, 
   SELECT_NEW_CYCLE, 
   PURGE_WORKOUT 
} from '../../constants/index';
import _ from 'lodash';

const testCycles = [
   { name: 'cycle a', id: 'cycle-a', workouts: ['workout-a', 'workout-b'], },
   { name: 'cycle b', id: 'cycle-b', workouts: ['workout-a', 'workout-c'], },
   { name: 'cycle c', id: 'cycle-c', workouts: ['workout-c', 'workout-d'], },
]

describe('cycleReducer tests', () => {
   it('should have proper initial state', () => {
      // Arrange
      const expectedInitialState = {
         cycles: [],
         selectedCycleId: undefined,
         selectedCycleIndex: undefined,
         selectedCycle: undefined,
      }

      // Act
      const initialState = cycleReducer(undefined, {});

      // Assert
      expect(initialState).toEqual(expectedInitialState);
   });

   describe('INITIALIZE_CYCLES tests', () => {
      it('should initialize store according to action', () => {
         // Arrange
         const action = {
            type: INITIALIZE_CYCLES,
            cycles: testCycles,
            selectedCycleId: 'cycle-a',
            selectedCycleIndex: 0,
         };

         // Act
         const cycleState = cycleReducer(undefined, action);

         // Assert
         expect(cycleState).toEqual({
            cycles: testCycles,
            selectedCycleId: 'cycle-a',
            selectedCycleIndex: 0,
            selectedCycle: { 
               name: 'cycle a', 
               id: 'cycle-a', 
               workouts: ['workout-a', 'workout-b'], 
            },
         });
      });

      it('should leave selectedCycle undefined if no cycle is selected', () => {
         // Arrange
         const action = {
            type: INITIALIZE_CYCLES,
            cycles: testCycles,
         };

         // Act
         const cycleState = cycleReducer(undefined, action);

         // Assert
         expect(cycleState).toEqual({
            cycles: testCycles,
         });
      });
   });

   describe('SET_SELECTED_CYCLE_INDEX tests', () => {
      it('should update only the selectedCycleIndex', () => {
         // Arrange
         const action = {
            type: SET_SELECTED_CYCLE_INDEX,
            selectedCycleIndex: 2,
         };
         const prevStore = {
            cycles: testCycles,
            selectedCycleId: 'cycle-a',
            selectedCycleIndex: 0,
            selectedCycle: { 
               name: 'cycle a', 
               id: 'cycle-a', 
               workouts: ['workout-a', 'workout-b'], 
            },
         }

         // Act
         const cycleState = cycleReducer(prevStore, action);

         // Assert
         expect(cycleState).toEqual({
            ...prevStore,
            selectedCycleIndex: 2,
         });
      });
   });

   describe('ADD_CYCLE tests', () => {
      it('should add the new cycle to the store', () => {
         // Arrange
         const newCycle = {
            name: 'new cycle',
            id: 'new-cycle-id',
            workouts: ['workout-id-a'],
         }
         const action = {
            type: ADD_CYCLE,
            cycle: newCycle,
         };
         const prevStore = {
            cycles: testCycles,
         }

         // Act
         const cycleState = cycleReducer(prevStore, action);

         // Assert
         expect(cycleState).toEqual({
            ...prevStore,
            cycles: [...testCycles, newCycle],
         });
      });
   });

   describe('UPDATE_CYCLE tests', () => {
      it('should modify the specified cycle if it exists', () => {
         // Arrange
         const newCycleContent = {
            name: 'new cycle',
            workouts: ['workout-id-a'],
         }
         const editCycleId = 'cycle-a';

         const action = {
            type: UPDATE_CYCLE,
            newCycleContent,
            cycleId: editCycleId,
         };
         const prevStore = {
            cycles: testCycles,
         }

         // Act
         const cycleState = cycleReducer(prevStore, action);

         // Assert
         expect(_.find(cycleState.cycles, (cycle) => cycle.id === editCycleId))
            .toEqual({ ...newCycleContent, id: editCycleId });
      });

      it('should not modify the store if the cycle does not exist', () => {
         // Arrange
         const newCycleContent = {
            name: 'new cycle',
            workouts: ['workout-id-a'],
         }
         const editCycleId = 'i-dont-exist';

         const action = {
            type: UPDATE_CYCLE,
            newCycleContent,
            cycleId: editCycleId,
         };
         const prevStore = {
            cycles: testCycles,
         }

         // Act
         const cycleState = cycleReducer(prevStore, action);

         // Assert
         expect(cycleState).toEqual(prevStore);
      });
   });

   describe('DELETE_CYCLE tests', () => {
      it('should delete the specified cycle if it exists', () => {
         // Arrange
         const deleteCycleId = testCycles[0].id;

         const action = {
            type: DELETE_CYCLE,
            cycleId: deleteCycleId,
         };
         const prevStore = {
            cycles: testCycles,
         }

         // Act
         const cycleState = cycleReducer(prevStore, action);

         // Assert
         expect(cycleState.cycles).toEqual(testCycles.slice(1, testCycles.length));
      });

      it('should not modify the store if the cycle does not exist', () => {
         // Arrange
         const editCycleId = 'i-dont-exist';

         const action = {
            type: DELETE_CYCLE,
            cycleId: editCycleId,
         };
         const prevStore = {
            cycles: testCycles,
         }

         // Act
         const cycleState = cycleReducer(prevStore, action);

         // Assert
         expect(cycleState).toEqual(prevStore);
      });
   });

   describe('SELECT_NEW_CYCLE tests', () => {
      it('should set selectedCycleId, selectedCycleIndex, and selectedCycle appropriately', () => {
         // Arrange
         const newSelectedCycleId = 'cycle-c';
         const selectedCycle = _.find(testCycles, (cycle) => cycle.id === newSelectedCycleId);

         const action = {
            type: SELECT_NEW_CYCLE,
            cycleId: newSelectedCycleId,
         };
         const prevStore = {
            cycles: testCycles,
            selectedCycleId: 'cycle-a',
            selectedCycleIndex: 1,
            selectedCycle: { 
               name: 'cycle a', 
               id: 'cycle-a', 
               workouts: ['workout-a', 'workout-b'], 
            },
         }

         // Act
         const cycleState = cycleReducer(prevStore, action);

         // Assert
         expect(cycleState.selectedCycleId).toEqual(newSelectedCycleId);
         expect(cycleState.selectedCycleIndex).toEqual(0);
         expect(cycleState.selectedCycle).toEqual(selectedCycle);
      });
   });

   describe('PURGE_WORKOUT tests', () => {
      it('should remove the workout from all cycles that contain it', () => {
         // Arrange
         const purgeWorkoutId = 'workout-c';
         const purgeCycleIds = ['cycle-b', 'cycle-c'];

         const action = {
            type: PURGE_WORKOUT,
            workoutId: purgeWorkoutId,
            cycleIds: purgeCycleIds,
         };
         const prevStore = {
            cycles: testCycles,
            selectedCycleId: 'cycle-a',
            selectedCycleIndex: 1,
            selectedCycle: { 
               name: 'cycle a', 
               id: 'cycle-a', 
               workouts: ['workout-a', 'workout-b'], 
            },
         }

         // Act
         const cycleState = cycleReducer(prevStore, action);

         // Assert
         expect(cycleState.cycles[1].workouts.includes('workout-c')).toBe(false);
         expect(cycleState.cycles[2].workouts.includes('workout-c')).toBe(false);
      });
   });

}) 