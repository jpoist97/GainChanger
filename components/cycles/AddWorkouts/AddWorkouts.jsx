import * as React from 'react';
import { SafeAreaView } from 'react-native';
import AllWorkouts from './SelectWorkouts';
import ModalScreenWrapper from '../../utils/ModalScreenWrapper';

// this page is the same thing as workouts, except the workout cards are selectable (replace ellipses with circles)

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

  return ( // This allows you to access 2 different pages on same navigation tab. (i.e. Workouts)
    <ModalScreenWrapper>
        <SafeAreaView style={{ height: '100%' }}>
          <AllWorkouts items={items} />
        </SafeAreaView>
    </ModalScreenWrapper>
  );

};
