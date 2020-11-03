import React from 'react';
import { Text, View } from 'react-native';
import LogWorkout from './LogWorkout';

export default () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Workout Screen</Text>
    <Text>Replace these Text tags with your component</Text>
    <LogWorkout exercises={[{
      name: 'Rows',
      sets: [{
        weight: 125, reps: 8, completed: true, prevWeight: 125,
      }],
    },
  {
    name: 'Curls',
    sets: [],
  }]}
    />
  </View>
);
