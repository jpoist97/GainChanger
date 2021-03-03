import exerciseActions from '../../actions/exerciseActions';
import api from '../../api';
import { INITIALIZE_EXERCISES, ADD_CUSTOM_EXERCISE, COMPLETE_EXERCISE_LOAD } from '../../constants/index';

jest.mock('../../api.js', () => ({
   fetchExercises: jest.fn(),
}));

const mockDispatch = jest.fn();

const exercises = [
   { name: 'Tricep Dips', id: 'exercise-id-a', muscleGroups: 'Triceps' },
   { name: 'Bicep Curls', id: 'exercise-id-b', muscleGroups: 'Biceps' },
   { name: 'Bench Press', id: 'exercise-id-c', muscleGroups: 'Chest' },
];

afterEach(() => {
   jest.clearAllMocks();
});

describe('exerciseAction tests', () => {
   describe('initializeExercise tests', () => {
      it('should dispatch INITIALIZE_EXERCISES with exercises from firestore', async () => {
         // Arrange
         api.fetchExercises.mockResolvedValue(exercises);

         // Act
         const thunkFunction = exerciseActions.initalizeExercises();
         await thunkFunction(mockDispatch);

         // Assert
         expect(mockDispatch).toHaveBeenCalledWith({
            type: INITIALIZE_EXERCISES,
            exercises,
         });
         expect(api.fetchExercises).toHaveBeenCalled();
      });

      it('should dispatch COMPLETE_EXERCISE_LOAD', async () => {
         // Arrange
         api.fetchExercises.mockResolvedValue(exercises);

         // Act
         const thunkFunction = exerciseActions.initalizeExercises();
         await thunkFunction(mockDispatch);

         // Assert
         expect(mockDispatch).toHaveBeenCalledWith({
            type: COMPLETE_EXERCISE_LOAD,
         });
      });
   });

   describe('addCustomExercise tests', () => {
      it('should dispatch ADD_CUSTOM_EXERCISES with new exercise', () => {
         // Arrange
         const newExercise = {
            name: 'Custom Exercse',
            id: 'custom-exercise-id',
            muscleGroups: 'Back',
         }

         // Act
         const thunkFunction = exerciseActions.addCustomExercise(newExercise);
         thunkFunction(mockDispatch);

         // Assert
         expect(mockDispatch).toHaveBeenCalledWith({
            type: ADD_CUSTOM_EXERCISE,
            exercise: newExercise,
         });
      })
   })
});