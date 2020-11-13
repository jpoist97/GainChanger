import * as React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import AllCycles from './AllCycles';
import PlusButton from '../utils/PlusButton';
import CreateCycle from './CreateCycle';

const AddCycleButton = styled(PlusButton)`
   position: absolute;
   bottom: 20px;
   right: 25px;
`;

export default ({ navigation }) => {
  const items = [
    {
      name: 'Push, Pull, Legs A', subtext: '7 Workouts', color: '#CAB0FF', onPress: () => alert('Push, Pull, Legs A'), onIconPress: () => alert('Edit Push, Pull, Legs'),
    },
    {
      name: 'Bro Split A', subtext: '4 Workouts', color: '#9D8DFF', onPress: () => alert('Bro Split A'), onIconPress: () => alert('Edit Bro Split A'),
    },
    {
      name: 'Upper Lower Split A', subtext: '3 Workouts', color: '#6D8DFF', onPress: () => alert('Upper Lower Split A'), onIconPress: () => alert('Edit Upper Lower Split'),
    },
    {
      name: 'Push, Pull, Legs B', subtext: '7 Workouts', color: '#CAB0FF', onPress: () => alert('Push, Pull, Legs B'), onIconPress: () => alert('Edit Push, Pull, Legs B'),
    },
    {
      name: 'Bro Split B', subtext: '4 Workouts', color: '#9D8DFF', onPress: () => alert('Bro Split B'), onIconPress: () => alert('Edit Bro Split B'),
    },
    {
      name: 'Upper Lower Split B', subtext: '3 Workouts', color: '#6D8DFF', onPress: () => alert('Upper Lower Split B'), onIconPress: () => alert('Edit Upper Lower Split B'),
    },
    {
      name: 'Push, Pull, Legs A', subtext: '7 Workouts', color: '#CAB0FF', onPress: () => alert('Push, Pull, Legs A'), onIconPress: () => alert('Edit Push, Pull, Legs'),
    }];

  const Stack = createStackNavigator();
  return ( // This allows you to access 2 different pages on same navigation tab. (i.e. Workouts)
    <SafeAreaView style={{ height: '100%' }}>
      <Stack.Navigator initialRouteName="Cycles">
        <Stack.Screen name="Cycles" component={Cycles} options={{ headerShown: false }} />
        <Stack.Screen name="Create Cycle" component={CreateCycle} options={{ headerShown: false }} />
      </Stack.Navigator>
    </SafeAreaView>
  );
  function Cycles() {
    return (
      <SafeAreaView style={{ height: '100%' }}>
        <AllCycles items={items} />
        <AddCycleButton title="Cycle" size={18} onPress={() => navigation.navigate('Create Cycle')} />
      </SafeAreaView>
    );
  }
};
