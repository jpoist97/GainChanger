import { createStore, combineReducers, applyMiddleware } from 'redux';
import workoutReducer from '../reducers/workoutReducer';
import cycleReducer from '../reducers/cycleReducer';
import exerciseReducer from '../reducers/exerciseReducer';
import thunk from 'redux-thunk';
import pastWorkoutDateReducer from '../reducers/pastWorkoutDatesReducer';
import workoutRecordReducer from '../reducers/workoutRecordReducer'
import progressReducer from '../reducers/progressReducer';

const rootReducer = combineReducers({ 
   workouts: workoutReducer, 
   cycles: cycleReducer,
   exercises: exerciseReducer,
   dates: pastWorkoutDateReducer,
   records: workoutRecordReducer,
   progress: progressReducer,
});

const configureStore = () => {
   return createStore(rootReducer, applyMiddleware(thunk));
}

export default configureStore;