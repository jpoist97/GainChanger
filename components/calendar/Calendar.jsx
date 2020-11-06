import * as React from 'react';
import { Text, View } from 'react-native';
import LogWorkout from '../workouts/LogWorkout';

// eslint-disable-next-line no-unused-vars
export default (props) => (
  <LogWorkout
    name="Pull A"
    exercises={[{
      name: 'Bicep Curls',
      sets: [{
        weight: '30', reps: '8',
      }, {
        weight: '30', reps: '8',
      }, {
        weight: '30', reps: '8',
      }, {
        weight: '30', reps: '8',
      }],
    }, {
      name: 'Rows',
      color: '#6D8DFF',
      sets: [{
        weight: '150', reps: '12',
      }, {
        weight: '150', reps: '12',
      }, {
        weight: '150', reps: '12',
      }, {
        weight: '150', reps: '12',
      }],
    }, {
      name: 'Reverse Fly',
      color: '#9D8DFF',
      sets: [{
        weight: '25', reps: '20',
      }, {
        weight: '25', reps: '20',
      }, {
        weight: '25', reps: '20',
      }, {
        weight: '25', reps: '20',
      }],
    }]}
  />
);
