/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import {
  SafeAreaView, Image, View,
} from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import * as firebase from 'firebase';
import { toDate, differenceInCalendarDays } from 'date-fns';
import CurrentCycle from './CurrentCycle';
import WorkoutSwipeList from './WorkoutSwipeList';
import {
  INITIALIZE_WORKOUTS,
  INITIALIZE_CYCLES,
  INITIALIZE_EXERCISES,
  INCREMENT_SELECTED_CYCLE_INDEX,
  DECREMENT_SELECTED_CYCLE_INDEX,
} from '../../constants/index';
import 'firebase/firestore';

const Title = styled.Text`
  font-family: 'Montserrat_700Bold';
  font-size: 40px;
  margin: 0px 6%;
`;

const welcomeName = 'Shriya';

const retrieveUsers = async (userRef) => {
  const userDoc = await userRef.get();
  return userDoc.data();
};

const retrieveWorkouts = async (userRef) => {
  const workouts = [];
  const workoutRef = userRef.collection('workouts');
  const workoutSnapshot = await workoutRef.get();

  workoutSnapshot.forEach((doc) => {
    const {
      exercises, name, lastPerformed, muscleGroups,
    } = doc.data();
    const dateDiff = differenceInCalendarDays(new Date(), toDate(lastPerformed.seconds * 1000));

    if (exercises && name && muscleGroups) {
      workouts.push({
        id: doc.id,
        name,
        exercises,
        muscleGroups,
        lastPerformed: dateDiff,
      });
    }
  });

  return workouts;
};

const retrieveCycles = async (userRef) => {
  const cycles = [];
  const cycleRef = userRef.collection('cycles');
  const cycleSnapshot = await cycleRef.get();

  cycleSnapshot.forEach((doc) => {
    const { workoutIDs, name } = doc.data();

    if (workoutIDs && name) {
      cycles.push({
        id: doc.id,
        name,
        workouts: workoutIDs,
      });
    }
  });

  return cycles;
};

const retrieveExercises = async (dbRef) => {
  const exercises = [];
  const exerciseRef = dbRef.collection('exercises');
  const exerciseSnapshot = await exerciseRef.get();

  exerciseSnapshot.forEach((doc) => {
    const { name, muscleGroups } = doc.data();

    if (name && muscleGroups) {
      exercises.push({
        id: doc.id,
        name,
        muscleGroups: muscleGroups.join(', '),
      });
    }
  });

  return exercises;
};

export default () => {
  useEffect(() => {
    const initializeDatabase = async () => {
      // Get the current logged in user id
      // const currentUser = firebase.auth().currentUser.uid;
      const currentUser = '68w6wWz8l5QJO3tDukh1fRXWYjD2';

      const dbRef = firebase.firestore();
      const userRef = dbRef.collection('users').doc(currentUser);

      // Retrieve firestore data in parallel
      const firestoreResponse = await Promise.all([
        retrieveUsers(userRef),
        retrieveWorkouts(userRef),
        retrieveCycles(userRef),
        retrieveExercises(dbRef),
      ]);
      const [userData, workouts, cycles, exercises] = firestoreResponse;

      // Initialize redux store
      console.log('Home: Initializing Workout store');
      dispatch({ type: INITIALIZE_WORKOUTS, workouts });

      console.log('Home: Initializing Cycles store');
      dispatch({
        type: INITIALIZE_CYCLES,
        cycles,
        selectedCycleId: userData.selectedCycleId,
        selectedCycleIndex: userData.selectedCycleIndex,
      });

      console.log('Home: Initialize Exercise store');
      dispatch({ type: INITIALIZE_EXERCISES, exercises });
    };

    initializeDatabase();
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
          cycleLength = {cycleDetails && cycleDetails.length}
          selectedCycleIndex = {cycles.selectedCycleIndex}
        />
        <WorkoutSwipeList items={workoutList} style={{ marginLeft: '10%' }} />
      </View>
    </SafeAreaView>

  );
};
