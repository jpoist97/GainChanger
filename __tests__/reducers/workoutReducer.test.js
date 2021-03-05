import workoutReducer from '../../reducers/workoutReducer';
import { 
    INITIALIZE_WORKOUTS, 
    ADD_WORKOUT, 
    DELETE_WORKOUT, 
    UPDATE_WORKOUT, 
    UPDATE_WORKOUT_EXERCISES 
} from '../../constants/index';
import { pushWorkout, pullWorkout, legsWorkout } from '../../constants/index';

describe('workoutReducer tests', () => {

    describe('INITIALIZE_WORKOUTS tests', () => {

        it('should test initial store without action', () => {

            const expectedInitialState = {
                workouts: [],
            }

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

            const workoutState = workoutReducer({
                workouts: [pullWorkout]
            }, action);

            expect(workoutState).toEqual(expectedState);
        });
    });

    describe('DELETE_WORKOUT tests', () => {

        const action = {
            type: DELETE_WORKOUT,
            workoutId: ,
        };

        it('should delete a workout', () => {

            const expectedState = {
                workouts: [pushWorkout],
            };

            const workoutState = workoutReducer({workouts: [pullWorkout, pushWorkout]}, action);

            expect(workoutState).toEqual(expectedState);
        });
    });

    describe('UPDATE_WORKOUT tests', () => {
        
    });
});