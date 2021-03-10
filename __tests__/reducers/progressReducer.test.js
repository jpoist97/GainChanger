import progressReducer from '../../reducers/progressReducer';
import { UPDATE_USER_PROGRESS, SET_EXERCISE_RECORDS, START_LOADING_EXERCISE_RECORDS, ADD_NEW_EXERCISE_RECORDS } from '../../constants/index';
import { format, toDate } from 'date-fns';

describe('progressReducer tests', () => {
it('should have proper initial state', () => {
    // Arrange
    const expectedInitialState = {
      profileStats: {
         totalWeightLifted: 0,
         totalWorkoutsPerformed: 0,
         weightPersonalRecord: 0,
      },
      exerciseRecords: {},
      loading: false,
   }
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
       const updatedProgress = progressReducer(undefined, action);

       // Assert
       expect(updatedProgress.profileStats).toEqual(
          {
            totalWeightLifted: 5,
            totalWorkoutsPerformed: 10,
            weightPersonalRecord: 15,
          }
       );
    });
  });

  describe('START_LOADING_EXERCISE_RECORDS tests', () => {
   it('should update only the loading bool', () => {
      // Arrange
      const action = {
         type: START_LOADING_EXERCISE_RECORDS,
         loading: true,
      };

      // Act
      const updatedProgress = progressReducer(undefined, action);

      // Assert
      expect(updatedProgress.loading).toBe(
         true
      );
   });
 });

 describe('SET_EXERCISE_RECORDS tests', () => {
   it('should change format of date field', () => {
      // Arrange

      const fakeExerciseRecords = [
         {
            date: {
               nanoseconds: 0,
               seconds: 1613349232,
             },
             exerciseId: '6zvctw4Ii0dHgBX1eQe6',
             weight: 120,
         },
         {
            date: {
               nanoseconds: 593000000,
               seconds: 1613586471,
             },
             exerciseId: '6zvctw4Ii0dHgBX1eQe6',
             weight: 140,
         },

         ]
      const expectedExerciseRecords = [
         {
            date: '02-14-21',
            exerciseId: '6zvctw4Ii0dHgBX1eQe6',
            weight: 120,
         },
         {
            date: '02-17-21',
            exerciseId: '6zvctw4Ii0dHgBX1eQe6',
            weight: 140,
         }
      ]

      const action = {
         type: SET_EXERCISE_RECORDS,
         exerciseId: '6zvctw4Ii0dHgBX1eQe6',
         exerciseRecords: fakeExerciseRecords,
      };

      // Act
      const updatedProgress = progressReducer(undefined, action);

      // Assert
      expect(updatedProgress.exerciseRecords).toEqual({
         '6zvctw4Ii0dHgBX1eQe6': expectedExerciseRecords,
      });
   });

   it('should only change loading field to false', () => {
      // Arrange
      const fakeExerciseRecords = [
         {
            date: {
               nanoseconds: 0,
               seconds: 1613349232,
             },
             exerciseId: '6zvctw4Ii0dHgBX1eQe6',
             weight: 120,
         },
         {
            date: {
               nanoseconds: 593000000,
               seconds: 1613586471,
             },
             exerciseId: '6zvctw4Ii0dHgBX1eQe6',
             weight: 140,
         },

         ]

      const action = {
         type: SET_EXERCISE_RECORDS,
         exerciseId: '6zvctw4Ii0dHgBX1eQe6',
         exerciseRecords: fakeExerciseRecords,
      };

      // Act
      const updatedProgress = progressReducer(undefined, action);

      // Assert
      expect(updatedProgress.loading).toBe(
         false
      );
   });
 });

 describe('ADD_NEW_EXERCISE_RECORDS tests', () => {
   it('should add new exercise records to state if exercise already loaded in redux', () => {
      // Arrange
      const fakeInitialState = {
         exerciseRecords: {
            'exc-1': [ 
               {
                  exerciseId: 'exc-1',
                  weight: 120,
                  date: '02-17-21',
              },
            ],
            'exc-2': [ 
               {
                  exerciseId: 'exc-2',
                  weight: 120,
                  date: '02-17-21',
              },
            ]
         }
      }
      const expectedExerciseRecords = {
         'exc-1': [ 
            {
               exerciseId: 'exc-1',
               weight: 120,
               date: '02-17-21',
            },
            {
            exerciseId: 'exc-1',
            weight: 120,
            date: format(new Date(), 'MM-dd-yy'),
            },
         ],
         'exc-2': [ 
            {
               exerciseId: 'exc-2',
               weight: 120,
               date: '02-17-21',
            },
            {
            exerciseId: 'exc-2',
            weight: 120,
            date: format(new Date(), 'MM-dd-yy'),
            },
         ]
      }

      
      const fakeExerciseRecords = [
         {
             exerciseId: 'exc-1',
             weight: 120,
         },
         {
             exerciseId: 'exc-2',
             weight: 120,
         },
      ]

      const action = {
         type: ADD_NEW_EXERCISE_RECORDS,
         exerciseRecords: fakeExerciseRecords,
      };

      // Act
      const updatedRecords = progressReducer(fakeInitialState, action);

      // Assert
      expect(updatedRecords.exerciseRecords).toEqual(
         expectedExerciseRecords,
      );
   });

   it('should not add new records to state if exercises havent been loaded to redux', () => {
      // Arrange
      const fakeInitialState = {
         exerciseRecords: {
            'exc-3': [ 
               {
                  exerciseId: 'exc-3',
                  weight: 120,
                  date: '02-17-21',
              },
            ],
            'exc-4': [ 
               {
                  exerciseId: 'exc-4',
                  weight: 120,
                  date: '02-17-21',
              },
            ]
         }
      }
      
      const fakeExerciseRecords = [
         {
             exerciseId: 'exc-1',
             weight: 120,
         },
         {
             exerciseId: 'exc-2',
             weight: 120,
         },

      ]

      const action = {
         type: ADD_NEW_EXERCISE_RECORDS,
         exerciseRecords: fakeExerciseRecords,
      };

      // Act
      const updatedRecords = progressReducer(fakeInitialState, action);

      // Assert
      expect(updatedRecords.exerciseRecords).toEqual(
         fakeInitialState.exerciseRecords,
      );
   });
 });

})