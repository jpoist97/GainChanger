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

const testCycles = [
   { name: 'cycle a', id: 'cycle-a', workoutIds: ['workout-a', 'workout-b'], },
   { name: 'cycle b', id: 'cycle-b', workoutIds: ['workout-a', 'workout-c'], },
   { name: 'cycle c', id: 'cycle-c', workoutIds: ['workout-c', 'workout-d'], },
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
               workoutIds: ['workout-a', 'workout-b'], 
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
               workoutIds: ['workout-a', 'workout-b'], 
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
}) 