/* eslint-disable no-use-before-define, react/prop-types */
import * as React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import AllWorkouts from './AllWorkouts';
import PlusButton from '../utils/PlusButton';
import CreateWorkout from './CreateWorkout';
import { COLORS } from '../../constants/index';

const AddCycleButton = styled(PlusButton)`
   position: absolute;
   bottom: 20px;
   right: 25px;
`;

export default ({ navigation }) => {
  const workouts = useSelector((state) => state.workouts.workouts);

  const items = workouts.map((workout, index) => ({
    name: workout.name,
    subtext: workout.muscleGroups,
    color: workout.color,
    onPress: () => alert(`Navigate to workout ${workout.id}`),
    deleteWorkout: () => alert(`dispatch delete workout with ${workout.id}`),
  }));

  // const items = [
  //   {
  //     name: 'Back & Biceps', subtext: 'Back Biceps', color: '#CAB0FF', onPress: () => alert('Push, Pull, Legs A'), deleteWorkout: () => alert('Deleted Push, Pull, Legs'),
  //   },
  //   {
  //     name: 'Upper A RP', subtext: 'Chest Triceps', color: '#9D8DFF', onPress: () => alert('Bro Split A'), deleteWorkout: () => alert('Deleted Bro Split A'),
  //   },
  //   {
  //     name: 'Legs A', subtext: 'Quads Glutes', color: '#6D8DFF', onPress: () => alert('Upper Lower Split A'), deleteWorkout: () => alert('Deleted Upper Lower Split'),
  //   },
  //   {
  //     name: 'Pull B', subtext: 'Back Biceps', color: '#CAB0FF', onPress: () => alert('Push, Pull, Legs B'), deleteWorkout: () => alert('Deleted Push, Pull, Legs B'),
  //   },
  //   {
  //     name: 'Push B', subtext: 'Chest Triceps', color: '#9D8DFF', onPress: () => alert('Bro Split B'), deleteWorkout: () => alert('Deleted Bro Split B'),
  //   },
  //   {
  //     name: 'Legs B', subtext: 'Quads Glutes', color: '#6D8DFF', onPress: () => alert('Upper Lower Split B'), deleteWorkout: () => alert('Deleted Upper Lower Split B'),
  //   },
  //   {
  //     name: 'Legs C', subtext: 'Quads Glutes', color: '#6D8DFF', onPress: () => alert('Upper Lower Split B'), deleteWorkout: () => alert('Deleted Upper Lower Split B'),
  //   }];

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
