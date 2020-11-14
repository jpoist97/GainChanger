/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import {
  SafeAreaView, Image, View,
} from 'react-native';
import styled from 'styled-components/native';
import CurrentCycle from './CurrentCycle';
import WorkoutList from './WorkoutList';
import { useDispatch, useSelector } from 'react-redux';
import { INITIALIZE_WORKOUTS, INITIALIZE_CYCLES, INITIALIZE_EXERCISES } from '../../constants/index';
import { workouts as DBWorkoutResponse } from '../../FakeData';

const Title = styled.Text`
  font-family: 'Montserrat_700Bold';
  font-size: 40px;
  margin: 0px 6%;
`;

const COLOR_ARR = ['#CAB0FF', '#9D8DFF', '#6D8DFF'];

const welcomeName = 'Justin';

export default () => {

  const workouts = useSelector((state) => state.workouts.workouts);
  const dispatch = useDispatch();

  useEffect(() => {
    // This is where we would hit our database, but for now we'll have fake data
    console.log("Home: Initializing Workout store");
    dispatch({ type: INITIALIZE_WORKOUTS, workouts: DBWorkoutResponse });

    console.log("Home: Initializing Cycles store");
    dispatch({ type: INITIALIZE_CYCLES, cycles: [], seletedCycle: 0, selectedCycleIndex: 3 });

    console.log("Home: Initialize Exercise store");
    dispatch({ type: INITIALIZE_EXERCISES, exercises: [] });
  }, []);

  // Parse the database response into workoutList
  const workoutList = workouts.map((workout, index) => ({
    name: workout.name,
    subtext: `${workout.lastPerformed} days ago`,
    color: COLOR_ARR[index % 3],
    onPress: () => alert(`Navigate to workout ${workout.id}`),
  }))

  // const workoutList = [
  //   {
  //     name: 'Lateral Pulldown ABC', subtext: '1 day ago', color: '#CAB0FF', onPress: () => alert('Start Lateral Pulldown ABC'),
  //   },
  //   {
  //     name: 'Upper A RP', subtext: '7 days ago', color: '#9D8DFF', onPress: () => alert('Start Upper A RP'),
  //   },
  //   {
  //     name: 'Legs A', subtext: '1 day', color: '#6D8DFF', onPress: () => alert('Start Legs A'),
  //   },
  //   {
  //     name: 'Pull B', subtext: '2 days', color: '#CAB0FF', onPress: () => alert('Start Pull B'),
  //   },
  //   {
  //     name: 'Push B', subtext: '1 day', color: '#9D8DFF', onPress: () => alert('Start Push B'),
  //   },
  //   {
  //     name: 'Legs B', subtext: '22 days ago', color: '#6D8DFF', onPress: () => alert('Start Legs B'), onIconPress: () => alert('Edit Upper Lower Split B'),
  //   },
  // ];
  const cycleDetails = [
    {
      workoutName: 'Pull A', subtext: 'Back, Biceps', color: '#CAB0FF', onPress: () => alert('Start Pull A'),
    },
    {
      workoutName: 'Upper A RP', subtext: 'Shoulders, Triceps', color: '#9D8DFF', onPress: () => alert('Start Upper A RP'),
    },
    {
      workoutName: 'Legs A', subtext: 'Glutes, Quads', color: '#6D8DFF', onPress: () => alert('Start Legs A'),
    },
    {
      workoutName: 'Pull B', subtext: 'Back, Biceps', color: '#CAB0FF', onPress: () => alert('Start Pull B'),
    },
    {
      workoutName: 'Push B', subtext: 'Chest, Triceps', color: '#9D8DFF', onPress: () => alert('Start Push B'),
    },
    {
      workoutName: 'Legs B', subtext: 'Hamstrings, Glutes', color: '#6D8DFF', onPress: () => alert('Start Legs B'), onIconPress: () => alert('Edit Upper Lower Split B'),
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
          leftPress={() => setCurrentWorkout(currentWorkout === 0 ? cycleDetails.length - 1 : currentWorkout - 1)}
          rightPress={() => setCurrentWorkout((currentWorkout + 1) % cycleDetails.length)}
        />
        <WorkoutList items={workoutList} style={{ marginLeft: '10%' }} />
      </View>
    </SafeAreaView>

  );
};
