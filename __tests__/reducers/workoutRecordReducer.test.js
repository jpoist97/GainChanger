import workoutRecordReducer from '../../reducers/workoutRecordReducer';
import { ADD_WORKOUT_RECORD } from '../../constants/index';

const testExercises = [
   {
      exercisesId: '6zvctw4Ii0dHgBX1eQe6',
      exerciseName: 'Incline Curl',
      sets: [
         {
            time: 10,
            weight: 225,
         },
         {
            time: 10,
            weight: 225,
         },
         {
            time: 10,
            weight: 225,
         },
      ],
   },
   {
      exercisesId: '2TvJvGO8CuxXzxk1D2Si',
      exerciseName: 'Leg Curl',
      sets: [
         {
            time: 12,
            weight: 135,
         },
         {
            time: 12,
            weight: 135,
         },
         {
            time: 12,
            weight: 135,
         },
      ],
   },
];

describe('workoutRecordReducer tests', () => {
   it('should return the initial state', () => {
      const expectedInitialState = {
         records: {},
      };

      const initialState = workoutRecordReducer(undefined, {});

      expect(initialState).toEqual(expectedInitialState);
   });

   describe('should test ADD_WORKOUT_RECORD', () => {
      const action = {
         type: ADD_WORKOUT_RECORD,
         record: {
            date: '2021-03-03',
            exercises: testExercises,
            workoutId: 'id',
            workoutName: 'Legs',
         },
         date: '2021-03-03',
      };

      it('should test adding workout to empty state', () => {
         const workoutRecordState = workoutRecordReducer(undefined, action);

         expect(workoutRecordState).toEqual({
            records: {
               '2021-03-03': [
                  {
                     date: '2021-03-03',
                     exercises: testExercises,
                     workoutId: 'id',
                     workoutName: 'Legs',
                  },
               ],
            },
         });
      });

      it('should adding workout record for existing date', () => {
         const workoutRecordState = workoutRecordReducer(
            {
               records: {
                  '2021-03-03': [
                     {
                        date: '2021-03-03',
                        exercises: testExercises,
                        workoutId: 'id1',
                        workoutName: 'Legs1',
                     },
                  ],
               },
            },
            action
         );

         expect(workoutRecordState).toEqual({
            records: {
               '2021-03-03': [
                  {
                     date: '2021-03-03',
                     exercises: testExercises,
                     workoutId: 'id1',
                     workoutName: 'Legs1',
                  },
                  {
                     date: '2021-03-03',
                     exercises: testExercises,
                     workoutId: 'id',
                     workoutName: 'Legs',
                  },
               ],
            },
         });
      });
   });
});
