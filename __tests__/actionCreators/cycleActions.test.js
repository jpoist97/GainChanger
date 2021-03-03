import cycleActions from '../../actions/cycleActions';
import api from '../../api';
import { INITIALIZE_CYCLES, COMPLETE_CYCLE_LOAD, SET_SELECTED_CYCLE_INDEX, ADD_CYCLE, UPDATE_CYCLE, DELETE_CYCLE, SELECT_NEW_CYCLE } from '../../constants/index';

jest.mock('../../api.js', () => ({
   fetchCycles: jest.fn(),
   updateSelectedCycleIndex: jest.fn(),
}));

const mockDispatch = jest.fn();

const selectedCycleId = 'selected-cycle-id';
const selectedCycleIndex = 1;
const cycles = [
  { name: 'Push, Pull, Legs', id: 'selected-cycle-id', workoutIds: ['workout-id-a', 'workout-id-b'] },
  { name: 'Upper/Legs split', id: 'cycle-id-b', workoutIds: ['workout-id-c', 'workout-id-d'] },
];

afterEach(() => {
  jest.clearAllMocks();
});

describe('cycleActions tests', () => {
  describe('initializeCycles tests', () => {
    it('should dispatch INITIALIZE_CYCLES with fetchCycles result', async () => {
      // Arrange
      api.fetchCycles.mockResolvedValue(cycles);

      // Act
      const thunkFunction = cycleActions.initializeCycles(selectedCycleId, selectedCycleIndex);
      await thunkFunction(mockDispatch);

      // Assert
      expect(mockDispatch).toHaveBeenCalledWith({
        type: INITIALIZE_CYCLES,
        cycles,
        selectedCycleId,
        selectedCycleIndex,
      });
      expect(api.fetchCycles).toHaveBeenCalled();
    });

    it('should dispatch COMPLETE_CYCLE_LOAD', async () => {
      // Arrange
      api.fetchCycles.mockResolvedValue(cycles);

      // Act
      const thunkFunction = cycleActions.initializeCycles(selectedCycleId, selectedCycleIndex);
      await thunkFunction(mockDispatch);

      // Assert
      expect(mockDispatch).toHaveBeenCalledWith({
        type: COMPLETE_CYCLE_LOAD,
      });
    });
  });

  describe('incrementSelectedCycleIndex tests', () => {
    it('should dispatch SET_SELECTED_CYCLE_INDEX with incremented cycle index', () => {
      // Arrange
      const prevIndex = 1;
      const cycleLength = 4;

      // Act
      const thunkFunction = cycleActions.incrementSelectedCycleIndex(prevIndex, cycleLength);
      thunkFunction(mockDispatch);

      // Assert
      expect(mockDispatch).toHaveBeenCalledWith({
        type: SET_SELECTED_CYCLE_INDEX,
        selectedCycleIndex: prevIndex + 1,
      });
    });

    it('should call updateSelectedCycleIndex to update firestore', () => {
      // Arrange
      const prevIndex = 1;
      const cycleLength = 4;

      // Act
      const thunkFunction = cycleActions.incrementSelectedCycleIndex(prevIndex, cycleLength);
      thunkFunction(mockDispatch);

      // Assert
      expect(api.updateSelectedCycleIndex).toHaveBeenCalledWith(prevIndex + 1);
    });

    it('should call wrap around when selectedCycleIndex is the last in the cycle', () => {
      // Arrange
      // PrevIndex is 3 bc length - 1 is last index
      const prevIndex = 3;
      const cycleLength = 4;

      // Act
      const thunkFunction = cycleActions.incrementSelectedCycleIndex(prevIndex, cycleLength);
      thunkFunction(mockDispatch);

      // Assert
      expect(api.updateSelectedCycleIndex).toHaveBeenCalledWith(0);
    });
  });

  describe('decrementSelectedCycleIndex tests', () => {
    it('should dispatch SET_SELECTED_CYCLE_INDEX with decremented cycle index', () => {
      // Arrange
      const prevIndex = 1;
      const cycleLength = 4;

      // Act
      const thunkFunction = cycleActions.decrementSelectedCycleIndex(prevIndex, cycleLength);
      thunkFunction(mockDispatch);

      // Assert
      expect(mockDispatch).toHaveBeenCalledWith({
        type: SET_SELECTED_CYCLE_INDEX,
        selectedCycleIndex: prevIndex - 1,
      });
    });

    it('should call updateSelectedCycleIndex to update firestore', () => {
      // Arrange
      const prevIndex = 1;
      const cycleLength = 4;

      // Act
      const thunkFunction = cycleActions.decrementSelectedCycleIndex(prevIndex, cycleLength);
      thunkFunction(mockDispatch);

      // Assert
      expect(api.updateSelectedCycleIndex).toHaveBeenCalledWith(prevIndex - 1);
    });

    it('should call wrap around when selectedCycleIndex is the last in the cycle', () => {
      // Arrange
      const prevIndex = 0;
      const cycleLength = 4;

      // Act
      const thunkFunction = cycleActions.decrementSelectedCycleIndex(prevIndex, cycleLength);
      thunkFunction(mockDispatch);

      // Assert
      expect(api.updateSelectedCycleIndex).toHaveBeenCalledWith(3);
    });
  });

  describe('addCycle tests', () => {
    it('should return an appropriate action', () => {
      // Arrange
      const testCycle = {
        name: 'test-cycle',
        workoutIds: ['test-workout-id'],
        id: 'test-cycle-id',
      };

      // Act
      const action = cycleActions.addCycle(testCycle);

      // Assert
      expect(action).toEqual({
        type: ADD_CYCLE,
        cycle: testCycle,
      })
    });
  });

  describe('updateCycle tests', () => {
    it('should return an appropriate action', () => {
      // Arrange
      const testCycleId = 'new-cycle-id';
      const newCycleContent = {
        name: 'test-cycle',
        workoutIds: ['test-workout-id'],
        id: 'test-cycle-id',
      };

      // Act
      const action = cycleActions.updateCycle(testCycleId, newCycleContent);

      // Assert
      expect(action).toEqual({
        type: UPDATE_CYCLE,
        cycleId: testCycleId,
        newCycleContent,
      })
    });
  });

  describe('deleteCycle tests', () => {
    it('should return an appropriate action', () => {
      // Arrange
      const testCycleId = 'delete-cycle-id';

      // Act
      const action = cycleActions.deleteCycle(testCycleId);

      // Assert
      expect(action).toEqual({
        type: DELETE_CYCLE,
        cycleId: testCycleId,
      })
    });
  });


  describe('selectCycle tests', () => {
    it('should return an appropriate action', () => {
      // Arrange
      const testCycleId = 'select-cycle-id';

      // Act
      const action = cycleActions.selectCycle(testCycleId);

      // Assert
      expect(action).toEqual({
        type: SELECT_NEW_CYCLE,
        cycleId: testCycleId,
      })
    });
  });

});