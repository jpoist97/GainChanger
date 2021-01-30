import { createStore, combineReducers, applyMiddleware } from 'redux';
import workoutReducer from '../reducers/workoutReducer';
import cycleReducer from '../reducers/cycleReducer';
import exerciseReducer from '../reducers/exerciseReducer';
<<<<<<< HEAD
import recordReducer from '../reducers/recordReducer';
=======
import thunk from 'redux-thunk';
>>>>>>> ddaaf913608cd1abf018bf99bb9cb2a9b81085a2

const rootReducer = combineReducers({ 
   workouts: workoutReducer, 
   cycles: cycleReducer,
   exercises: exerciseReducer,
   records: recordReducer,
});

const configureStore = () => {
   return createStore(rootReducer, applyMiddleware(thunk));
}

export default configureStore;