import progressReducer from '../../reducers/progressReducer';
import { UPDATE_USER_PROGRESS, SET_EXERCISE_RECORDS, START_LOADING_EXERCISE_RECORDS, ADD_NEW_EXERCISE_RECORDS } from '../../constants/index';

const expectedInitialState = {
    profileStats: {
       totalWeightLifted: 0,
       totalWorkoutsPerformed: 0,
       weightPersonalRecord: 0,
    },
    exerciseRecords: {},
    loading: false,
 }

describe('progressReducer tests', () => {
it('should have proper initial state', () => {
    // Arrange

    // Act
    const initialState = progressReducer(undefined, {});

    // Assert
    expect(initialState).toEqual(expectedInitialState);
});

describe('UPDATE_USER_PROGRESS tests', () => {
    it('should update only profileStats', () => {
       // Arrange
       const action = {
            type: UPDATE_USER_PROGRESS,
            totalWeightLifted: 5,
            totalWorkoutsPerformed: 10,
            weightPersonalRecord: 15,
       };

       // Act
       const updatedProgress = progressReducer(expectedInitialState, action);

       // Assert
       expect(updatedProgress).toEqual({
          ...expectedInitialState,
          profileStats: {
            totalWeightLifted: 5,
            totalWorkoutsPerformed: 10,
            weightPersonalRecord: 15,
          }
       });
    });
  });

})