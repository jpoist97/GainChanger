import { createStore, combineReducers, applyMiddleware } from 'redux';
import workoutReducer from '../reducers/workoutReducer';
import cycleReducer from '../reducers/cycleReducer';
import exerciseReducer from '../reducers/exerciseReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({ 
   workouts: workoutReducer, 
   cycles: cycleReducer,
   exercises: exerciseReducer,
});

const configureStore = () => {
   return createStore(rootReducer, applyMiddleware(thunk));
}

export default configureStore;