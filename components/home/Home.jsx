/* eslint-disable no-use-before-define */
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
  const workoutList = [
    {
      name: 'Lateral Pulldown ABC', subtext: '1 day ago', color: '#CAB0FF', id: 10,
    },
    {
      name: 'Upper A RP', subtext: '7 days ago', color: '#9D8DFF', id: 11,
    },
    {
      name: 'Legs A', subtext: '1 day', color: '#6D8DFF', id: 12,
    },
    {
      name: 'Pull B', subtext: '2 days', color: '#CAB0FF', id: 13,
    },
    {
      name: 'Push B', subtext: '1 day', color: '#9D8DFF', id: 14,
    },
    {
      name: 'Legs B', subtext: '22 days ago', color: '#6D8DFF', id: 15,
    },
  ];
  const cycleDetails = [
    {
      workoutName: 'Pull A', subtext: 'Back, Biceps', color: '#CAB0FF', id: 16,
    },
    {
      workoutName: 'Upper A RP', subtext: 'Shoulders, Triceps', color: '#9D8DFF', id: 17,
    },
    {
      workoutName: 'Legs A', subtext: 'Glutes, Quads', color: '#6D8DFF', id: 18,
    },
    {
      workoutName: 'Pull B', subtext: 'Back, Biceps', color: '#CAB0FF', id: 19,
    },
    {
      workoutName: 'Push B', subtext: 'Chest, Triceps', color: '#9D8DFF', id: 20,
    },
    {
      workoutName: 'Legs B', subtext: 'Hamstrings, Glutes', color: '#6D8DFF', id: 21,
    },
  ];
  const [currentWorkout, setCurrentWorkout] = React.useState(0);
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
      <View style={{ height: '50%', marginBottom: '25%' }}>
        <CurrentCycle
          name={cycleDetails[currentWorkout].workoutName}
          subtext={cycleDetails[currentWorkout].subtext}
          onPress={cycleDetails[currentWorkout].onPress}
          color={cycleDetails[currentWorkout].color}
          id={cycleDetails[currentWorkout].id}
          leftPress={() => setCurrentWorkout(
            currentWorkout === 0 ? cycleDetails.length - 1 : currentWorkout - 1,
          )}
          rightPress={() => setCurrentWorkout((currentWorkout + 1) % cycleDetails.length)}
        />
        <WorkoutList items={workoutList} style={{ marginLeft: '10%' }} />
      </View>
    </SafeAreaView>

  );
};
