import * as React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import AlphabetWorkoutList from './AlphabetWorkoutList';
import PlusButton from '../utils/PlusButton';
import CreateWorkout from '../CreateWorkout/CreateWorkout';

const AddCycleButton = styled(PlusButton)`
   position: absolute;
   bottom: 20px;
   right: 25px;
`;

export default ({ navigation }) => {
  const workouts = useSelector((state) => state.workouts.workouts);

  const items = workouts.map((workout) => ({
    name: workout.name,
    subtext: workout.muscleGroups,
    color: workout.color,
    id: workout.id,
  }));

  const Stack = createStackNavigator();

  function Workouts() {
    return (
      <SafeAreaView style={{ height: '100%' }}>
        <AlphabetWorkoutList items={items} />
        <AddCycleButton title="Workout" size={18} onPress={() => navigation.navigate('Create Workout')} />
      </SafeAreaView>
    );
  }

  return ( // This allows you to access 2 different pages on same navigation tab. (i.e. Workouts)
    <SafeAreaView style={{ height: '100%' }}>
      <Stack.Navigator initialRouteName="Workouts">
        <Stack.Screen name="Workouts" component={Workouts} options={{ headerShown: false }} />
        <Stack.Screen name="Create Workout" component={CreateWorkout} options={{ headerShown: false }} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};
