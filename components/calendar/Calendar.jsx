import * as React from 'react';
import { Text, View } from 'react-native';
import LogWorkout from '../workouts/LogWorkout';

// eslint-disable-next-line no-unused-vars
export default (props) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Calendar Screen</Text>
    <Text>Replace these Text tags with your component</Text>
    <LogWorkout exercises={[{name: 'Bicep Curls', sets: [{prevWeight: '125', weight: '125', reps: '8', completed: false}, {prevWeight: '125', weight: '125', reps: '8', completed: false}, {prevWeight: '125', weight: '125', reps: '8', completed: false}, {prevWeight: '125', weight: '125', reps: '8', completed: false}]}]}/>
  </View>
);
