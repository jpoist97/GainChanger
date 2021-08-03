import workoutReducer from '../../reducers/workoutReducer';
import {
   INITIALIZE_WORKOUTS,
   ADD_WORKOUT,
   DELETE_WORKOUT,
   UPDATE_WORKOUT,
   UPDATE_WORKOUT_EXERCISES,
   pushWorkout,
   pullWorkout,
   legsWorkout,
} from '../../constants/index';

describe('workoutReducer tests', () => {
   describe('INITIALIZE_WORKOUTS tests', () => {
      it('should test initial store without action', () => {
         const expectedInitialState = {
            workouts: [],
         };

         const workoutState = workoutReducer(undefined, {});

         expect(expectedInitialState).toEqual(workoutState);
      });

      it('should test intial workout store with action', () => {
         const action = {
            type: INITIALIZE_WORKOUTS,
            workouts: [pushWorkout, pullWorkout, legsWorkout],
         };

         const expectedState = {
            workouts: [pushWorkout, pullWorkout, legsWorkout],
         };

         const workoutState = workoutReducer(undefined, action);

         expect(workoutState).toEqual(expectedState);
      });
   });

   describe('ADD_WORKOUT tests', () => {
      const action = {
         type: ADD_WORKOUT,
         workout: pushWorkout,
      };

      it('should add workout to empty state', () => {
         const expectedState = {
            workouts: [pushWorkout],
         };

         const workoutState = workoutReducer(undefined, action);

         expect(workoutState).toEqual(expectedState);
      });

      it('should add workout to existing state', () => {
         const expectedState = {
            workouts: [pullWorkout, pushWorkout],
         };

         const workoutState = workoutReducer(
            {
               workouts: [pullWorkout],
            },
            action
         );

         expect(workoutState).toEqual(expectedState);
      });
   });

   describe('DELETE_WORKOUT tests', () => {
      const fakestate = {
         workouts: [
            { workout: pullWorkout, id: 'a' },
            { workout: pushWorkout, id: 'b' },
            { workout: legsWorkout, id: 'c' },
         ],
      };

      it('should delete a workout', () => {
         const expectedState = {
            workouts: [
               { workout: pullWorkout, id: 'a' },
               { workout: pushWorkout, id: 'b' },
            ],
         };

         const action = {
            type: DELETE_WORKOUT,
            workoutId: 'c',
         };

         const workoutState = workoutReducer(fakestate, action);

         expect(workoutState).toEqual(expectedState);
      });
   });

   describe('UPDATE_WORKOUT tests', () => {
      const fakestate = {
         workouts: [{ workout: pullWorkout, id: 'a' }],
      };

      const action = {
         type: UPDATE_WORKOUT,
         workoutId: 'a',
         newWorkoutContent: pushWorkout,
      };

      it('should update a workout', () => {
         const expectedState = {
            workouts: [
               {
                  ...pushWorkout,
                  id: 'a',
               },
            ],
         };

         const workoutState = workoutReducer(fakestate, action);

         expect(workoutState).toEqual(expectedState);
      });

      it('should attempt to update a non-existing workout', () => {
         const updateAction = {
            type: UPDATE_WORKOUT,
            workoutId: 'z',
            newWorkoutContent: pushWorkout,
         };

         const workoutState = workoutReducer(fakestate, updateAction);

         expect(workoutState).toEqual(fakestate);
      });
   });

   describe('UPDATE_WORKOUT_EXERCISES tests', () => {
      const fakestate = {
         workouts: [{ ...pullWorkout, id: 'a' }],
      };

      it('should update the exercises of an existing workout', () => {
         const action = {
            type: UPDATE_WORKOUT_EXERCISES,
            workoutId: 'a',
            updatedExercises: pushWorkout.exercises,
         };

         const expectedState = {
            workouts: [
               {
                  name: pullWorkout.name,
                  muscleGroups: pullWorkout.muscleGroups,
                  lastPerformed: 0,
                  id: 'a',
                  exercises: pushWorkout.exercises,
               },
            ],
         };

         const workoutState = workoutReducer(fakestate, action);

         expect(workoutState).toEqual(expectedState);
      });

      it('should attempt to update a non-existing workout', () => {
         const action = {
            type: UPDATE_WORKOUT_EXERCISES,
            workoutId: 'z',
            updatedExercises: pushWorkout.exercises,
         };

         const workoutState = workoutReducer(fakestate, action);

         expect(workoutState).toEqual(fakestate);
      });
   });
});
