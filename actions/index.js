import cycleActions from './cycleActions';
import workoutActions from './workoutActions';
import exerciseActions from './exerciseActions';
import pastWorkoutDatesActions from './pastWorkoutDatesActions';
import workoutRecordActions from './workoutRecordActions';

export default {
   cycles: cycleActions,
   workouts: workoutActions,
   exercises: exerciseActions,
   records: workoutRecordActions,
   dates: pastWorkoutDatesActions,
};