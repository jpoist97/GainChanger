// Workouts
export const ADD_WORKOUT = 'ADD_WORKOUT';
export const DELETE_WORKOUT = 'DELETE_WORKOUT';
export const INITIALIZE_WORKOUTS = 'INITIALIZE_WORKOUTS';
export const UPDATE_WORKOUT = 'UPDATE_WORKOUT';
export const UPDATE_WORKOUT_EXERCISES = 'UPDATE_WORKOUT_EXERCISES';

// Cycles
export const INITIALIZE_CYCLES = 'INITIALIZE_CYCLES';
export const SET_SELECTED_CYCLE_INDEX = 'SET_SELECTED_CYCLE_INDEX';
export const ADD_CYCLE = 'ADD_CYCLE';
export const UPDATE_CYCLE = 'UPDATE_CYCLE';
export const DELETE_CYCLE = 'DELETE_CYCLE';
export const SELECT_NEW_CYCLE = 'SELECT_NEW_CYCLE';
export const PURGE_WORKOUT = 'PURGE_WORKOUT'

// Exercises
export const INITIALIZE_EXERCISES = 'INITIALIZE_EXERCISES';
export const ADD_CUSTOM_EXERCISE = 'ADD_CUSTOM_EXERCISE';

// Past Workout Dates
export const INITIALIZE_DATES = 'INITIALIZE_DATES';
export const ADD_WORKOUT_RECORD_DATE = 'ADD_WORKOUT_RECORD_DATE';

// Workout Records
export const ADD_WORKOUT_RECORD = 'ADD_WORKOUT_RECORD';

// Progress
export const INITIALIZE_USER_PROGRESS = 'INITIALIZE_USER_PROGRESS';
export const UPDATE_USER_PROGRESS = 'UPDATE_USER_PROGRESS';
export const START_LOADING_EXERCISE_RECORDS = 'START_LOADING_EXERCISE_RECORDS';
export const SET_EXERCISE_RECORDS = 'SET_EXERCISE_RECORDS';

// Misc
// This includes the unique selected cycle color, should prob be moved
export const COLORS = {
  'default': ['#CAB0FF', '#9D8DFF', '#6D8DFF', '#4457BC'],
  'aqua': ['#4EC9DA', '#65C6BE', '#7DD8FF', '#86DDB4'],
};

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];