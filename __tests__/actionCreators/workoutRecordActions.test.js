import workoutRecordActions from '../../actions/workoutRecordActions';
import { ADD_WORKOUT_RECORD } from '../../constants/index';

describe('workoutRecordActions tests', () => {
    describe('addWorkoutRecord', () => {
        it('should add a workout date', () => {
            // Arrange
            const record = {date: '2021-01-02', 
                            exercises: {exerciseId: '8VCL74rAxToBI75OSJ3C',
                                        exerciseName: 'Bicycle Crunch',
                                        sets: {reps: '10',
                                            weight: 'n/a'}},
                            workoutId: 'RuRXXb6uAWiPk2XHqKMv',
                            workoutName: 'Baller'}
            const date = ['2021-01-02'];

            // Act
            const action = workoutRecordActions.addWorkoutRecord(record, date);

            //Assert
            expect(action).toEqual({
                type: ADD_WORKOUT_RECORD,
                record,
                date,
            })
        });
    });
});