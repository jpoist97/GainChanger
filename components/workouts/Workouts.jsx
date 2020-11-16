/* eslint-disable no-use-before-define, react/prop-types */
import * as React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import AllWorkouts from './AllWorkouts';
import PlusButton from '../utils/PlusButton';
import CreateWorkout from './CreateWorkout';
import AddExercises from './AddExercises';

const AddCycleButton = styled(PlusButton)`
   position: absolute;
   bottom: 20px;
   right: 25px;
`;

export default ({ navigation }) => {
  const items = [
    {
      name: 'Back & Biceps', subtext: 'Back Biceps', color: '#CAB0FF', id: 1, deleteWorkout: () => alert('Deleted Push, Pull, Legs'),
    },
    {
      name: 'Upper A RP', subtext: 'Chest Triceps', color: '#9D8DFF', id: 2, deleteWorkout: () => alert('Deleted Bro Split A'),
    },
    {
      name: 'Legs A', subtext: 'Quads Glutes', color: '#6D8DFF', id: 3, deleteWorkout: () => alert('Deleted Upper Lower Split'),
    },
    {
      name: 'Pull B', subtext: 'Back Biceps', color: '#CAB0FF', id: 4, deleteWorkout: () => alert('Deleted Push, Pull, Legs B'),
    },
    {
      name: 'Push B', subtext: 'Chest Triceps', color: '#9D8DFF', id: 5, deleteWorkout: () => alert('Deleted Bro Split B'),
    },
    {
      name: 'Legs B', subtext: 'Quads Glutes', color: '#6D8DFF', id: 6, deleteWorkout: () => alert('Deleted Upper Lower Split B'),
    },
    {
      name: 'Legs C', subtext: 'Quads Glutes', color: '#6D8DFF', id: 7, deleteWorkout: () => alert('Deleted Upper Lower Split B'),
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
        <AddCycleButton title="Workout" size={18} onPress={() => navigation.navigate('Create Workout')} />
      </SafeAreaView>
    );
  }
};
