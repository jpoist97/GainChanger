import * as React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import AllWorkouts from './AllWorkouts';
import PlusButton from '../utils/PlusButton';

const AddCycleButton = styled(PlusButton)`
   position: absolute;
   bottom: 20px;
   right: 25px;
`;

export default () => {
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

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <AllWorkouts items={items} />
      <AddCycleButton title="Workout" size={18} onPress={() => alert('Add Workout')} />
    </SafeAreaView>
  );
};
