import pastWorkoutDatesActions from '../../actions/pastWorkoutDatesActions';
import {
   INITIALIZE_DATES,
   ADD_WORKOUT_RECORD_DATE,
} from '../../constants/index';

describe('pastWorkoutDatesActions tests', () => {
   describe('initializeRecordDates tests', () => {
      it('should dispatch INITIALIZE_DATES with array of dates', () => {
         // Arrange
         const dates = ['2021-01-02', '2021-01-03', '2021-01-04'];

         // Act
         const action = pastWorkoutDatesActions.initializeRecordDates(dates);

         // Assert
         expect(action).toEqual({
            type: INITIALIZE_DATES,
            dates,
         });
      });
   });

   describe('addRecordDate tests', () => {
      it('should dispatch ADD_WORKOUT_RECORD_DATE with array of dates', () => {
         // Arrange
         const date = '2021-01-07';

         // Act
         const action = pastWorkoutDatesActions.addRecordDate(date);

         // Assert
         expect(action).toEqual({
            type: ADD_WORKOUT_RECORD_DATE,
            date,
         });
      });
   });
});
