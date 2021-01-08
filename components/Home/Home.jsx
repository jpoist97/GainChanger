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
import {
  INITIALIZE_WORKOUTS,
  INITIALIZE_CYCLES,
  INITIALIZE_EXERCISES,
  INCREMENT_SELECTED_CYCLE_INDEX,
  DECREMENT_SELECTED_CYCLE_INDEX,
} from '../../constants/index';
import { workouts as DBWorkoutResponse, exercises as DBExerciseResponse, cycleResp as DBCyclesResponse } from '../../FakeData';
import firebase from 'firebase';

const Title = styled.Text`
  font-family: 'Montserrat_700Bold';
  font-size: 40px;
  margin: 0px 6%;
`;

var welcomeName = 'Shriya';
const curUser = firebase.auth().currentUser
if(curUser){
  if(curUser.displayName){
    welcomeName = curUser.displayName;
  }
}

export default () => {
  useEffect(() => {
    // This is where we would hit our database, but for now we'll have fake data
    console.log('Home: Initializing Workout store');
    dispatch({ type: INITIALIZE_WORKOUTS, workouts: DBWorkoutResponse });

    console.log('Home: Initializing Cycles store');
    dispatch({
      type: INITIALIZE_CYCLES, cycles: DBCyclesResponse.cycles, selectedCycleId: DBCyclesResponse.selectedCycleId, selectedCycleIndex: DBCyclesResponse.selectedCycleIndex,
    });

    console.log('Home: Initialize Exercise store');
    dispatch({ type: INITIALIZE_EXERCISES, exercises: DBExerciseResponse });
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
          leftPress={() => { dispatch({ type: DECREMENT_SELECTED_CYCLE_INDEX, cycleLength: cycleDetails.length }); }}
          rightPress={() => { dispatch({ type: INCREMENT_SELECTED_CYCLE_INDEX, cycleLength: cycleDetails.length }); }}
          id={cycleDetails && selectedCycle.workouts[cycles.selectedCycleIndex]}
        />
        <WorkoutSwipeList items={workoutList} style={{ marginLeft: '10%' }} />
      </View>
    </SafeAreaView>

  );
};
