import { createStore, combineReducers } from 'redux';
import workoutReducer from '../reducers/workoutReducer';

const rootReducer = combineReducers(
   { workouts: workoutReducer }
);

const configureStore = () => {
   return createStore(rootReducer);
}

export default configureStore;