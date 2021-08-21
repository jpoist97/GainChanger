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
export const PURGE_WORKOUT = 'PURGE_WORKOUT';

// Exercises
export const INITIALIZE_EXERCISES = 'INITIALIZE_EXERCISES';
export const ADD_CUSTOM_EXERCISE = 'ADD_CUSTOM_EXERCISE';

// Past Workout Dates
export const INITIALIZE_DATES = 'INITIALIZE_DATES';
export const ADD_WORKOUT_RECORD_DATE = 'ADD_WORKOUT_RECORD_DATE';

// Workout Records
export const ADD_WORKOUT_RECORD = 'ADD_WORKOUT_RECORD';

// Progress
export const UPDATE_USER_PROGRESS = 'UPDATE_USER_PROGRESS';
export const START_LOADING_EXERCISE_RECORDS = 'START_LOADING_EXERCISE_RECORDS';
export const SET_EXERCISE_RECORDS = 'SET_EXERCISE_RECORDS';
export const ADD_NEW_EXERCISE_RECORDS = 'ADD_NEW_EXERCISE_RECORDS';

// Settings
export const UPDATE_USER_SETTINGS = 'UPDATE_USER_SETTINGS';

// Loading
export const COMPLETE_WORKOUT_LOAD = 'COMPLETE_WORKOUT_LOAD';
export const COMPLETE_CYCLE_LOAD = 'COMPLETE_CYCLE_LOAD';
export const COMPLETE_EXERCISE_LOAD = 'COMPLETE_EXERCISE_LOAD';
export const RESET_LOAD_STORE = 'RESET_LOAD_STORE';

// Misc
export const COLORS = {
   default: ['#CAB0FF', '#9D8DFF', '#6D8DFF', '#4457BC'],
   aqua: ['#86DDB4', '#65C6BE', '#4EC9DA', '#7DD8FF'],
   red: ['#FF965B', '#F0D548', '#FF5656', '#F9A8A8'],
   multi: ['#9EDF6D', '#FF7777', '#78D4F5', '#FF814A'],
};
export const LOGOS = {
   default: require('../assets/logo.png'),
   aqua: require('../assets/blueicon.png'),
   red: require('../assets/redicon.png'),
   multi: require('../assets/multiicon.png'),
};

// Dates
export const DAYS = [
   'Monday',
   'Tuesday',
   'Wednesday',
   'Thursday',
   'Friday',
   'Saturday',
   'Sunday',
];
export const MONTHS = [
   'January',
   'February',
   'March',
   'April',
   'May',
   'June',
   'July',
   'August',
   'September',
   'October',
   'November',
   'December',
];

// Initial workouts

export const pushWorkout = {
   name: 'Push',
   muscleGroups: 'Chest Triceps Shoulders',
   lastPerformed: 'N/A',
   exercises: [
      {
         exerciseId: '6peaHJkFD27icchxAJzD', // Bench Press
         sets: [
            { reps: 12, weight: null },
            { reps: 12, weight: null },
            { reps: 12, weight: null },
         ],
      },
      {
         exerciseId: 'XzkLscitllVWr1sRrMAk', // Shoulder Press
         sets: [
            { reps: 10, weight: null },
            { reps: 10, weight: null },
            { reps: 10, weight: null },
            { reps: 8, weight: null },
         ],
      },
      {
         exerciseId: 'Tc6wqpA533v2umzEGLx6', // Push Ups
         sets: [
            { reps: 20, weight: null },
            { reps: 15, weight: null },
            { reps: 20, weight: null },
         ],
      },
      {
         exerciseId: 'fk3IABKT2FeCBgdAzl40', // Overhead Press
         sets: [
            { reps: 10, weight: null },
            { reps: 10, weight: null },
            { reps: 10, weight: null },
            { reps: 8, weight: null },
         ],
      },
   ],
};

export const pullWorkout = {
   name: 'Pull',
   muscleGroups: 'Back Biceps',
   lastPerformed: 'N/A',
   exercises: [
      {
         exerciseId: 'qNBHPtkEW3PclBZ3j5GW', // Bent Over Row
         sets: [
            { reps: 10, weight: null },
            { reps: 10, weight: null },
            { reps: 10, weight: null },
         ],
      },
      {
         exerciseId: 'KsrS05QfDkBOCQhMQ0Te', // Pull Ups
         sets: [
            { reps: 10, weight: null },
            { reps: 10, weight: null },
            { reps: 10, weight: null },
         ],
      },
      {
         exerciseId: 'VVwdHYCl6Nec5pYCfibk', // Pullover
         sets: [
            { reps: 8, weight: null },
            { reps: 8, weight: null },
            { reps: 8, weight: null },
         ],
      },
      {
         exerciseId: '6zvctw4Ii0dHgBX1eQe6', // Incline Curl
         sets: [
            { time: 45, weight: null },
            { time: 60, weight: null },
            { time: 40, weight: null },
         ],
      },
   ],
};

export const legsWorkout = {
   name: 'Legs',
   muscleGroups: 'Quads Calves',
   lastPerformed: 'N/A',
   exercises: [
      {
         exerciseId: 'OjxfnxDzbhQJ11ZAWx6D', // Jump Rope
         sets: [
            { time: 60, weight: null },
            { time: 120, weight: null },
            { time: 60, weight: null },
         ],
      },
      {
         exerciseId: 'mEphuc9OhKGE9uLJojWM', // Calf Raise
         sets: [
            { reps: 20, weight: null },
            { reps: 20, weight: null },
            { reps: 20, weight: null },
            { reps: 15, weight: null },
         ],
      },
      {
         exerciseId: 'dqQE9Pbzb7HJFDULu3fH', // Hip Adducter
         sets: [
            { reps: 15, weight: null },
            { reps: 15, weight: null },
            { reps: 15, weight: null },
            { reps: 15, weight: null },
         ],
      },
      {
         exerciseId: '31ROy02NIqplIBvXoaeB', // Squat
         sets: [
            { reps: 10, weight: null },
            { reps: 10, weight: null },
            { reps: 8, weight: null },
         ],
      },
   ],
};
