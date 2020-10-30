import * as React from 'react';
import { SafeAreaView, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';
import AllCycles from './AllCycles';

const PlusButton = styled(TouchableOpacity)`
   position: absolute;
   bottom: 20px;
   right: 25px;
   background-color: #EDEDF0;
   border-radius: 20px;
   padding: 10px;
`;

const Buttontext = styled.Text`
   font-family: 'Montserrat_500Medium';
   font-size: 18px;
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
    }];

  return (
    <SafeAreaView>
      <AllCycles items={items} />
      <PlusButton onPress={() => alert('Add new Cycle')}>
        <Text>
          <Buttontext>Cycle</Buttontext>
          <Entypo name="plus" size={18} color="black" />
        </Text>
      </PlusButton>
    </SafeAreaView>
  );
};
