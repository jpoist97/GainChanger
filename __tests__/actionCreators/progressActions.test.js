import progressActions from '../../actions/progressActions';
import api from '../../api';
import {
   UPDATE_USER_PROGRESS,
   SET_EXERCISE_RECORDS,
   START_LOADING_EXERCISE_RECORDS,
   ADD_NEW_EXERCISE_RECORDS,
} from '../../constants/index';

jest.mock('../../api.js', () => ({
   updateUserProgress: jest.fn(),
   retrieveExerciseRecords: jest.fn(),
   postExerciseRecords: jest.fn(),
}));

const mockDispatch = jest.fn();

const totalWeightLifted = 1000;
const totalWorkoutsPerformed = 6;
const weightPersonalRecord = 100;

const testExerciseId = 'test-exercise-id';
const exerciseRecords = [
   { date: '2021-02-15', exerciseId: testExerciseId, weight: 15 },
   { date: '2021-02-17', exerciseId: testExerciseId, weight: 20 },
];

afterEach(() => {
   jest.clearAllMocks();
});

describe('progressActions tests', () => {
   describe('initializeProgressStore tests', () => {
      it('should dispatch UPDATE_USER_PROGRESS with appropriate values', () => {
         // Arrange

         // Act
         const action = progressActions.initalizeProgressStore(
            totalWeightLifted,
            totalWorkoutsPerformed,
            weightPersonalRecord
         );

         // Assert
         expect(action).toEqual({
            type: UPDATE_USER_PROGRESS,
            totalWeightLifted,
            totalWorkoutsPerformed,
            weightPersonalRecord,
         });
      });
   });

   describe('updateProgressStats tests', () => {
      it('should dispatch UPDATE_USER_PROGRESS with appropriate values', () => {
         // Arrange

         // Act
         const thunkFunction = progressActions.updateProgressStats(
            totalWeightLifted,
            totalWorkoutsPerformed,
            weightPersonalRecord
         );
         thunkFunction(mockDispatch);

         // Assert
         expect(mockDispatch).toHaveBeenCalledWith({
            type: UPDATE_USER_PROGRESS,
            totalWeightLifted,
            totalWorkoutsPerformed,
            weightPersonalRecord,
         });
      });

      it('should dispatch update values in firestore', () => {
         // Arrange

         // Act
         const thunkFunction = progressActions.updateProgressStats(
            totalWeightLifted,
            totalWorkoutsPerformed,
            weightPersonalRecord
         );
         thunkFunction(mockDispatch);

         // Assert
         expect(api.updateUserProgress).toHaveBeenCalledWith(
            totalWeightLifted,
            totalWorkoutsPerformed,
            weightPersonalRecord
         );
      });
   });

   describe('fetchExerciseRecords tests', () => {
      it('should dispatch START_LOADING_EXERCISE_RECORDS', async () => {
         // Arrange
         api.retrieveExerciseRecords.mockResolvedValue(exerciseRecords);

         // Act
         const thunkFunction =
            progressActions.fetchExerciseRecords(testExerciseId);
         await thunkFunction(mockDispatch);

         // Assert
         expect(mockDispatch).toHaveBeenCalledWith({
            type: START_LOADING_EXERCISE_RECORDS,
         });
      });

      it('should dispatch SET_EXERCISE_RECORDS with records from firestore', async () => {
         // Arrange
         api.retrieveExerciseRecords.mockResolvedValue(exerciseRecords);

         // Act
         const thunkFunction =
            progressActions.fetchExerciseRecords(testExerciseId);
         await thunkFunction(mockDispatch);

         // Assert
         expect(mockDispatch).toHaveBeenCalledWith({
            type: SET_EXERCISE_RECORDS,
            exerciseId: testExerciseId,
            exerciseRecords,
         });
      });
   });

   describe('postNewExerciseRecords tests', () => {
      it('should dispatch ADD_NEW_EXERCISE_RECORDS', () => {
         // Arrange

         // Act
         const thunkFunction =
            progressActions.postNewExerciseRecords(exerciseRecords);
         thunkFunction(mockDispatch);

         // Assert
         expect(mockDispatch).toHaveBeenCalledWith({
            type: ADD_NEW_EXERCISE_RECORDS,
            exerciseRecords,
         });
      });

      it('should update the information in firestore', () => {
         // Arrange

         // Act
         const thunkFunction =
            progressActions.postNewExerciseRecords(exerciseRecords);
         thunkFunction(mockDispatch);

         // Assert
         expect(api.postExerciseRecords).toHaveBeenCalledWith(exerciseRecords);
      });
   });
});
