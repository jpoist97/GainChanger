import cycleActions from './cycleActions';
import workoutActions from './workoutActions';
import exerciseActions from './exerciseActions';
import pastWorkoutDatesActions from './pastWorkoutDatesActions';
import workoutRecordActions from './workoutRecordActions';
import progressActions from './progressActions';
import settingsActions from './settingsActions';
import loadingActions from './loadingActions';
import { fetchUserDoc, } from '../api';


const initializeAppData = () => {
   return async (dispatch) => {
      const userDoc = await fetchUserDoc();

      dispatch(workoutActions.initializeWorkouts());

      dispatch(cycleActions.initializeCycles(
         userDoc.selectedCycleId,
         userDoc.selectedCycleIndex,
      ));

      dispatch(exerciseActions.initalizeExercises());

      dispatch(pastWorkoutDatesActions.initializeRecordDates(userDoc.pastWorkoutDates));

      dispatch(progressActions.initalizeProgressStore(userDoc.totalWeightLifted, userDoc.totalWorkoutsPerformed, userDoc.weightPersonalRecord));

      dispatch(settingsActions.initializeSettings(userDoc.settings));
   }
};

export default {
   cycles: cycleActions,
   workouts: workoutActions,
   exercises: exerciseActions,
   records: workoutRecordActions,
   dates: pastWorkoutDatesActions,
   progress: progressActions,
   settings: settingsActions,
   loading: loadingActions,
   initializeAppData,
};