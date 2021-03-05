import exerciseReducer from '../../reducers/exerciseReducer';
import { INITIALIZE_EXERCISES, ADD_CUSTOM_EXERCISE } from '../../constants/index';

const testExercises = [
  { id: 'exercise-1', name: 'Bicep Curls', muscleGroups: 'Arms Chest'},
  { id: 'exercise-2', name: 'Leg Curls', muscleGroups: 'Legs'},
  { id: 'exercise-3', name: 'Bench Press', muscleGroups: 'Chest'},
]

describe('exerciseReducer tests', () => {
  it('should have proper initial state', () => {
     // Arrange
     const expectedInitialState = {
        exercises: [],
     }

     // Act
     const initialState = exerciseReducer(undefined, {});

     // Assert
     expect(initialState).toEqual(expectedInitialState);
  });

  describe('INITIALIZE_EXERCISES tests', () => {
     it('should initialize store according to action', () => {
        // Arrange
        const action = {
           type: INITIALIZE_EXERCISES,
           exercises: testExercises,
        };

        // Act
        const exerciseState = exerciseReducer(undefined, action);

        // Assert
        expect(exerciseState).toEqual({
          exercises: testExercises,
        });
      });
    });

    describe('ADD_CUSTOM_EXERCISE tests', () => {
      it('should add a custom exercise to exercise list ', () => {
         // Arrange
         const expectedExercises = [
          { id: 'exercise-1', name: 'Bicep Curls', muscleGroups: 'Arms Chest'},
          { id: 'exercise-2', name: 'Leg Curls', muscleGroups: 'Legs'},
          { id: 'exercise-3', name: 'Bench Press', muscleGroups: 'Chest'},
          { id: 'customExercise-1', name: 'Frog Squats', muscleGroups: 'Legs'}
        ]
 
         // Act
         const exerciseState = exerciseReducer(
          { exercises: testExercises },
          { type: ADD_CUSTOM_EXERCISE,
            exercise: {
              id: 'customExercise-1', 
              name: 'Frog Squats', 
              muscleGroups: 'Legs'
           }});
 
         // Assert
         expect(exerciseState).toEqual({
          exercises: expectedExercises,
        });
       });
     });
  });