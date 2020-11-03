import * as React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import AllCycles from './AllCycles';
import PlusButton from '../utils/PlusButton';

const AddCycleButton = styled(PlusButton)`
   position: absolute;
   bottom: 20px;
   right: 25px;
`;

export default () => {
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

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <AllCycles items={items} />
      <AddCycleButton title="Cycle" size={18} onPress={() => alert('Add Cycle')} />
    </SafeAreaView>
  );
};
