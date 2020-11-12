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
      name: 'Back & Biceps', subtext: 'Back Biceps', color: '#CAB0FF', onPress: () => alert('Push, Pull, Legs A'), onIconPress: () => alert('Edit Push, Pull, Legs'),
    },
    {
      name: 'Upper A RP', subtext: 'Chest Triceps', color: '#9D8DFF', onPress: () => alert('Bro Split A'), onIconPress: () => alert('Edit Bro Split A'),
    },
    {
      name: 'Legs A', subtext: 'Quads Glutes', color: '#6D8DFF', onPress: () => alert('Upper Lower Split A'), onIconPress: () => alert('Edit Upper Lower Split'),
    },
    {
      name: 'Pull B', subtext: 'Back Biceps', color: '#CAB0FF', onPress: () => alert('Push, Pull, Legs B'), onIconPress: () => alert('Edit Push, Pull, Legs B'),
    },
    {
      name: 'Push B', subtext: 'Chest Triceps', color: '#9D8DFF', onPress: () => alert('Bro Split B'), onIconPress: () => alert('Edit Bro Split B'),
    },
    {
      name: 'Legs B', subtext: 'Quads Glutes', color: '#6D8DFF', onPress: () => alert('Upper Lower Split B'), onIconPress: () => alert('Edit Upper Lower Split B'),
    },
    {
      name: 'Pull B', subtext: 'Back Biceps', color: '#CAB0FF', onPress: () => alert('Push, Pull, Legs B'), onIconPress: () => alert('Edit Push, Pull, Legs B'),
    },
    {
      name: 'Push B', subtext: 'Chest Triceps', color: '#9D8DFF', onPress: () => alert('Bro Split B'), onIconPress: () => alert('Edit Bro Split B'),
    },
    {
      name: 'Legs B', subtext: 'Quads Glutes', color: '#6D8DFF', onPress: () => alert('Upper Lower Split B'), onIconPress: () => alert('Edit Upper Lower Split B'),
    }];

  // Add an invisible WorkoutCard if there is an odd number of cards
  // Need this otherwise last element will render in middle, not left
  if (items.length % 2 !== 0) {
    items.push({ color: '#00000000', name: '', displayEllipses: false });
  }

  const Stack = createStackNavigator();
  return ( // This allows you to access 2 different pages on same navigation tab. (i.e. Workouts)
    <SafeAreaView style={{ height: '100%' }}>
      <Stack.Navigator initialRouteName="Workouts">
        <Stack.Screen name="Workouts" component={Workouts} options={{ headerShown: false }} />
        <Stack.Screen name="Create Workout" component={CreateWorkout} options={{ headerShown: false }} />
        <Stack.Screen name="Add Exercises" component={AddExercises} options={{ headerShown: false }} />
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
