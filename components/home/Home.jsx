import * as React from 'react';
import {
  SafeAreaView, Image, View,
} from 'react-native';
import styled from 'styled-components/native';
import CurrentCycle from './CurrentCycle';
import WorkoutList from './WorkoutList';

const Title = styled.Text`
  font-family: 'Montserrat_700Bold';
  font-size: 40px;
  margin: 0px 6%;
`;

const welcomeName = 'Justin';

export default () => {
  const items = [
    {
      name: 'Lateral Pulldo ...', subtext: '1 day ago', color: '#CAB0FF', onPress: () => alert('Push, Pull, Legs A'),
    },
    {
      name: 'Upper A RP', subtext: '7 days ago', color: '#9D8DFF', onPress: () => alert('Bro Split A'),
    },
    {
      name: 'Legs A', subtext: '1 day', color: '#6D8DFF', onPress: () => alert('Upper Lower Split A'),
    },
    {
      name: 'Pull B', subtext: '2 days', color: '#CAB0FF', onPress: () => alert('Push, Pull, Legs B'),
    },
    {
      name: 'Push B', subtext: '1 day', color: '#9D8DFF', onPress: () => alert('Bro Split B'),
    },
    {
      name: 'Legs B', subtext: '22 days ago', color: '#6D8DFF', onPress: () => alert('Upper Lower Split B'), onIconPress: () => alert('Edit Upper Lower Split B'),
    },
  ];
  const cycleDetails = {
    name: 'Pull A', subtext: 'Back, Biceps', color: '#CAB0FF', onPress: () => alert('Start Pull A'),
  };
  return (
    <SafeAreaView>
      <Image
        source={require('../../assets/logo.png')}
        style={{
          width: 215, height: 215, position: 'absolute', right: 10, top: 20,
        }}
      />
      <View style={{ marginBottom: '10%', marginTop: '5%' }}>
        <Title>Hello</Title>
        <Title>
          {welcomeName}
          !
        </Title>
      </View>
      <View style={{ height: '50%', marginBottom: '25%'}}>
        <CurrentCycle
          name={cycleDetails.name}
          subtext={cycleDetails.subtext}
          onPress={cycleDetails.onPress}
          color={cycleDetails.color}
        />
        <WorkoutList items={items} style={{ marginLeft: '10%' }} />
      </View>
    </SafeAreaView>

  );
};
