import { createStore, combineReducers } from 'redux';
import workoutReducer from '../reducers/workoutReducer';
import cycleReducer from '../reducers/cycleReducer';
import exerciseReducer from '../reducers/exerciseReducer';
import recordReducer from '../reducers/recordReducer';

const rootReducer = combineReducers({ 
   workouts: workoutReducer, 
   cycles: cycleReducer,
   exercises: exerciseReducer,
   records: recordReducer,
});

const configureStore = () => {
   return createStore(rootReducer);
}

export default configureStore;