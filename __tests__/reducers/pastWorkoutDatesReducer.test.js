import { 
    INITIALIZE_DATES, 
    ADD_WORKOUT_RECORD_DATE 
} from '../../constants/index';
import pastWorkoutDateReducer from '../../reducers/pastWorkoutDatesReducer';

describe('pastWorkoutDatesReducer tests', () => {

    const action = {
        type: ADD_WORKOUT_RECORD_DATE,
        date: '2021-01-01',
    };

    describe('should test initial state of pastWorkoutDates', () => {
    
        const expectedInitialState = {
            dates: [],
        };

        it('should initialize past workout dates', () => {

            const initialState = pastWorkoutDateReducer(undefined, {});
    
            expect(expectedInitialState).toEqual(initialState);
        });

        it('should initialize past workout dates with action', () => {

            const action = {
                type: INITIALIZE_DATES,
                dates: ['2021-01-01', '2021-01-02'],
            };

            const datesState = pastWorkoutDateReducer(undefined, action);

            expect(datesState).toEqual({dates: ['2021-01-01', '2021-01-02']});
        });
    });

    describe('should test adding dates', () => {

        it('should test adding a new date', () => {
    
            const pastWorkoutDatesState = pastWorkoutDateReducer(undefined, action);
    
            expect(pastWorkoutDatesState).toEqual({
                dates: ['2021-01-01'],
            });
        });

        it('should test adding an already existing date', () => {

            const pastWorkoutDatesState = pastWorkoutDateReducer({dates: ['2021-01-01']}, action);

            expect(pastWorkoutDatesState).toEqual({dates: ['2021-01-01']});
        });
    });
});