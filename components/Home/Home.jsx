/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import {
  SafeAreaView, Image, View,
} from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import CurrentCycle from './CurrentCycle';
import WorkoutSwipeList from './WorkoutSwipeList';
import { workouts as DBWorkoutResponse, exercises as DBExerciseResponse, cycleResp as DBCyclesResponse } from '../../FakeData';
import actions from '../../actions/index';

const Title = styled.Text`
  font-family: 'Montserrat_700Bold';
  font-size: 40px;
  margin: 0px 6%;
`;

const welcomeName = 'Shriya';

export default () => {
  useEffect(() => {
    // This is where we would hit our database, but for now we'll have fake data
    console.log('Home: Initializing Workout store');
    dispatch(actions.workouts.initializeWorkouts(DBWorkoutResponse));

    console.log('Home: Initializing Cycles store');
    console.log(actions);
    dispatch(actions.cycles.initializeCycles(DBCyclesResponse.cycles, DBCyclesResponse.selectedCycleId, DBCyclesResponse.selectedCycleIndex));

    console.log('Home: Initialize Exercise store');
    dispatch(actions.exercises.initalizeExercises(DBExerciseResponse));
  }, []);

  const workouts = useSelector((state) => state.workouts.workouts);
  const cycles = useSelector((state) => state.cycles);
  const dispatch = useDispatch();

  // Parse the database response into workoutList
  const workoutList = workouts.map((workout) => ({
    name: workout.name,
    subtext: `${workout.lastPerformed} days ago`,
    id: workout.id,
    color: workout.color,
  }));

  const selectedCycle = (cycles.selectedCycleId !== undefined) && _.find(cycles.cycles, (cycle) => cycle.id === cycles.selectedCycleId);
  let cycleDetails;
  if (!cycles.selectedCycleDetails && selectedCycle) {
    cycleDetails = selectedCycle.workouts.map((workoutId) => _.find(workouts, (workout) => workout.id === workoutId));
  }

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
          name={cycleDetails && cycleDetails[cycles.selectedCycleIndex].name}
          subtext={cycleDetails && cycleDetails[cycles.selectedCycleIndex].muscleGroups}
          color={cycleDetails && cycleDetails[cycles.selectedCycleIndex].color}
          leftPress={() => { dispatch(actions.cycles.decrementSelectedCycleIndex(cycleDetails.length)); }}
          rightPress={() => { dispatch(actions.cycles.incrementSelectedCycleIndex(cycleDetails.length)); }}
          id={cycleDetails && selectedCycle.workouts[cycles.selectedCycleIndex]}
        />
        <WorkoutSwipeList items={workoutList} style={{ marginLeft: '10%' }} />
      </View>
    </SafeAreaView>

  );
};
