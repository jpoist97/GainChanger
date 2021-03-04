import loadingReducer from '../../reducers/loadingReducer';

import { COMPLETE_WORKOUT_LOAD, COMPLETE_CYCLE_LOAD, COMPLETE_EXERCISE_LOAD, RESET_LOAD_STORE, } from '../../constants/index';

const expectedInitialState = {
  cyclesLoaded: false,
  workoutsLoaded: false,
  exercisesLoaded: false,
 }

describe('loadingReducer tests', () => {
  it('should have proper initial state', () => {
     // Arrange

     // Act
     const initialState = loadingReducer(undefined, {});

     // Assert
     expect(initialState).toEqual(expectedInitialState);
  });

  describe('COMPLETE_WORKOUT_LOAD tests', () => {
    it('should update only the complete workout load bool', () => {
       // Arrange
       const action = {
          type: COMPLETE_WORKOUT_LOAD,
          workoutsLoaded: true,
       };

       // Act
       const loadingState = loadingReducer(expectedInitialState, action);

       // Assert
       expect(loadingState).toEqual({
          ...expectedInitialState,
          workoutsLoaded: true,
       });
    });
  });
  describe('COMPLETE_EXERCISE_LOAD tests', () => {
    it('should update only the complete exercise load bool', () => {
       // Arrange
       const action = {
          type: COMPLETE_EXERCISE_LOAD,
          exercisesLoaded: true,
       };

       // Act
       const loadingState = loadingReducer(expectedInitialState, action);

       // Assert
       expect(loadingState).toEqual({
          ...expectedInitialState,
          exercisesLoaded: true,
       });
    });
  });

  describe('COMPLETE_CYCLE_LOAD tests', () => {
    it('should update only the complete workout load bool', () => {
       // Arrange
       const action = {
          type: COMPLETE_CYCLE_LOAD,
          cyclesLoaded: true,
       };

       // Act
       const loadingState = loadingReducer(expectedInitialState, action);

       // Assert
       expect(loadingState).toEqual({
          ...expectedInitialState,
          cyclesLoaded: true,
       });
    });
  });

  describe('RESET_LOAD_STORE tests', () => {
    it('should reset the loading state to initial State bool', () => {
      // Arrange
      const action = {
        type: RESET_LOAD_STORE,
      };

     const expectedInitialState = {
      cyclesLoaded: true,
      workoutsLoaded: true,
      exercisesLoaded: true,
     }

       // Act
       const loadingState = loadingReducer(expectedInitialState, action);

       // Assert
       expect(loadingState).toEqual({
          ...expectedInitialState,
          cyclesLoaded: false,
          workoutsLoaded: false,
          exercisesLoaded: false,
       });
    });
  });

}) 