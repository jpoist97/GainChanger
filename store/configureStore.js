import { createStore, combineReducers, applyMiddleware } from 'redux';
import workoutReducer from '../reducers/workoutReducer';
import cycleReducer from '../reducers/cycleReducer';
import exerciseReducer from '../reducers/exerciseReducer';
import thunk from 'redux-thunk';
import pastWorkoutDateReducer from '../reducers/pastWorkoutDatesReducer';
import workoutRecordReducer from '../reducers/workoutRecordReducer'

const rootReducer = combineReducers({ 
   workouts: workoutReducer, 
   cycles: cycleReducer,
   exercises: exerciseReducer,
   dates: pastWorkoutDateReducer,
   records: workoutRecordReducer,
});

const configureStore = () => {
   return createStore(rootReducer, applyMiddleware(thunk));
}

export default configureStore;