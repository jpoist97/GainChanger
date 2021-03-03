import { it } from 'date-fns/locale';
import workoutActions from '../../actions/workoutActions';
import * as api from '../../api';
import { 
    ADD_WORKOUT, 
    INITIALIZE_WORKOUTS, 
    DELETE_WORKOUT, 
    PURGE_WORKOUT, 
    DELETE_CYCLE, 
    UPDATE_WORKOUT, 
    UPDATE_WORKOUT_EXERCISES,
    COMPLETE_WORKOUT_LOAD,
} from '../../constants/index';

jest.mock('../../api.js', () => ({
    fetchWorkouts: jest.fn(),
}));

const mockDispatch = jest.fn();

const workouts = [
{ exercises: [{exerciseId: 'exercise1', exerciseName: 'Push Press', sets: {}}], lastPerformed: '2021-02-19', muscleGroups: 'Chest', name: 'Push'},
{ exercises: [{exerciseId: 'exercise2', exerciseName: 'Chest Press', sets: {}}], lastPerformed: '2021-02-18', muscleGroups: 'Chest', name: 'Push2'}]



afterEach(() => {
    jest.clearAllMocks();
});

describe('workoutActions tests', () => {
    describe('initializeWorkouts tests', () => {
        it('should dispatch INITIALIZE_WORKOUTS with fetchWorkouts result', async () => {
            // Arrange
            api.fetchWorkouts.mockResolvedValue(workouts);

            // Act
            const thunkFunction = workoutActions.initializeWorkouts();
            await thunkFunction(mockDispatch);

            // Assert
            expect(mockDispatch).toHaveBeenCalledWith({
                type: INITIALIZE_WORKOUTS,
                workouts,
            });
            expect(api.fetchWorkouts).toHaveBeenCalled();
        });
    });

    describe('addWorkout test', () => {  
        it('should return an appropriate action', () => {
            // Arrange
            const testWorkout = { 
                exercises: [{exerciseId: 'exercise1', exerciseName: 'Push Press', sets: {}}], 
                lastPerformed: '2021-02-19', 
                muscleGroups: 'Chest', 
                name: 'Push'}

            // Act
            const action = workoutActions.addWorkout(testWorkout);

            // Assert
            expect(action).toEqual({
                type: ADD_WORKOUT,
                workout: testWorkout,
            });
        });
    });

    describe('updateWorkout test', () => {
        it('should dispatch UPDATE_WORKOUT with updated workout document', () => {
            // Arrange
            const testWorkoutId = 'test-workout-id';
            const newWorkoutContent = workouts;

            // Act
            const thunkFunction = workoutActions.updateWorkout(testWorkoutId, newWorkoutContent);
            thunkFunction(mockDispatch);

            // Assert
            expect(mockDispatch).toHaveBeenCalledWith({
                type: UPDATE_WORKOUT,
                workoutId : testWorkoutId,
                newWorkoutContent,
            });
        });
    });

    describe('updateWorkoutExercises test', () => {  
        it('should return an appropriate action', () => {
            // Arrange
            const updatedExercises = [{exerciseId: 'exercise1', exerciseName: 'Push Press', sets: {}}];
            const testWorkoutId = 'test-workout-id';
            
            // Act
            const action = workoutActions.updateWorkoutExercises(testWorkoutId, updatedExercises);

            // Assert
            expect(action).toEqual({
                type: UPDATE_WORKOUT_EXERCISES,
                workoutId : testWorkoutId,
                updatedExercises,
            });
        });
    });
});