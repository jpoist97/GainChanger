import { createStore, combineReducers } from 'redux';
import workoutReducer from '../reducers/workoutReducer';
import cycleReducer from '../reducers/cycleReducer';
import exerciseReducer from '../reducers/exerciseReducer';

const rootReducer = combineReducers({ 
   workouts: workoutReducer, 
   cycles: cycleReducer,
   exercises: exerciseReducer,
});

const configureStore = () => {
   return createStore(rootReducer);
}

export default configureStore;