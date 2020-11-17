import * as React from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import AllWorkouts from './AllWorkouts';
import CreateWorkout from './CreateWorkout';

//this page is the same thing as workouts, except the workout cards are selectable (replace ellipses with circles)


export default ({ navigation }) => {
  const items = [
    {
      name: 'Back & Biceps', subtext: 'Back Biceps', color: '#CAB0FF', onPress: () => alert('Push, Pull, Legs A'), deleteWorkout: () => alert('Deleted Push, Pull, Legs'),
    },
    {
      name: 'Upper A RP', subtext: 'Chest Triceps', color: '#9D8DFF', onPress: () => alert('Bro Split A'), deleteWorkout: () => alert('Deleted Bro Split A'),
    },
    {
      name: 'Legs A', subtext: 'Quads Glutes', color: '#6D8DFF', onPress: () => alert('Upper Lower Split A'), deleteWorkout: () => alert('Deleted Upper Lower Split'),
    },
    {
      name: 'Pull B', subtext: 'Back Biceps', color: '#CAB0FF', onPress: () => alert('Push, Pull, Legs B'), deleteWorkout: () => alert('Deleted Push, Pull, Legs B'),
    },
    {
      name: 'Push B', subtext: 'Chest Triceps', color: '#9D8DFF', onPress: () => alert('Bro Split B'), deleteWorkout: () => alert('Deleted Bro Split B'),
    },
    {
      name: 'Legs B', subtext: 'Quads Glutes', color: '#6D8DFF', onPress: () => alert('Upper Lower Split B'), deleteWorkout: () => alert('Deleted Upper Lower Split B'),
    },
    {
      name: 'Legs C', subtext: 'Quads Glutes', color: '#6D8DFF', onPress: () => alert('Upper Lower Split B'), deleteWorkout: () => alert('Deleted Upper Lower Split B'),
    }];

  const Stack = createStackNavigator();
  return ( // This allows you to access 2 different pages on same navigation tab. (i.e. Workouts)
    <SafeAreaView style={{ height: '100%' }}>
      <Stack.Navigator initialRouteName="Workouts">
        <Stack.Screen name="Workouts" component={Workouts} options={{ headerShown: false }} />
        <Stack.Screen name="Create Workout" component={CreateWorkout} options={{ headerShown: false }} />
      </Stack.Navigator>
    </SafeAreaView>
  );
  function Workouts() {
    return (
      <SafeAreaView style={{ height: '100%' }}>
        <AllWorkouts items={items} />

      </SafeAreaView>
    );
  }
};
