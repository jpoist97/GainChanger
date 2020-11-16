import * as React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';
import AllCycles from './AllCycles';
import PlusButton from '../utils/PlusButton';
import CreateCycle from './CreateCycle';

const AddCycleButton = styled(PlusButton)`
   position: absolute;
   bottom: 20px;
   right: 25px;
`;

export default (props) => {
  const navigation = useNavigation();
  // const items = [
  //   {
  //     name: 'Push, Pull, Legs A', subtext: '7 Workouts', color: '#CAB0FF', onPress: () => alert('Push, Pull, Legs A'), deleteCycle: () => alert('Delete Push, Pull, Legs'),
  //   },
  //   {
  //     name: 'Bro Split A', subtext: '4 Workouts', color: '#9D8DFF', onPress: () => alert('Bro Split A'), deleteCycle: () => alert('Delete Bro Split A'),
  //   },
  //   {
  //     name: 'Upper Lower Split A', subtext: '3 Workouts', color: '#6D8DFF', onPress: () => alert('Upper Lower Split A'), deleteCycle: () => alert('Delete Upper Lower Split'),
  //   },
  //   {
  //     name: 'Push, Pull, Legs B', subtext: '7 Workouts', color: '#CAB0FF', onPress: () => alert('Push, Pull, Legs B'), deleteCycle: () => alert('Delete Push, Pull, Legs B'),
  //   },
  //   {
  //     name: 'Bro Split B', subtext: '4 Workouts', color: '#9D8DFF', onPress: () => alert('Bro Split B'), deleteCycle: () => alert('Delete Bro Split B'),
  //   },
  //   {
  //     name: 'Upper Lower Split B', subtext: '3 Workouts', color: '#6D8DFF', onPress: () => alert('Upper Lower Split B'), deleteCycle: () => alert('Delete Upper Lower Split B'),
  //   },
  //   {
  //     name: 'Push, Pull, Legs A', subtext: '7 Workouts', color: '#CAB0FF', onPress: () => alert('Push, Pull, Legs A'), deleteCycle: () => alert('Delete Push, Pull, Legs'),
  //   }];

  const cycles = useSelector((state) => state.cycles);
  const allCycles = cycles.cycles.map((cycle) => ({
    ...cycle,
    subtext: `${cycle.workouts.length} Workouts`,
    onPress: () => alert(`Navigate to cycle ${cycle.id}`),
  }));
  const selectedCycle = cycles.selectedCycleId && _.find(allCycles, (cycle) => cycle.id === cycles.selectedCycleId);

  // const selectedCycle = {
  //   name: 'Upper Lower Split B', subtext: '3 Workouts', color: '#6D8DFF', onPress: () => alert('Upper Lower Split B'), deleteCycle: () => alert('Delete Upper Lower Split B'),
  // };

  function Cycles() {
    return (
      <SafeAreaView style={{ height: '100%' }}>
        <AllCycles items={items} selectedCycle={selectedCycle} />
        <AddCycleButton title="Cycle" size={18} onPress={() => navigation.navigate('Create Cycle')} />
      </SafeAreaView>
    );
  }

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
        <AllCycles items={allCycles} selectedCycle={selectedCycle} />
        <AddCycleButton title="Cycle" size={18} onPress={() => navigation.navigate('Create Cycle')} />
      </SafeAreaView>
    );
  }
};
