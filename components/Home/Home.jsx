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
import 'firebase/firestore';
import actions from '../../actions/index';
import { COLORS } from '../../constants/index';

const WelcomeTitle = styled.Text`
  font-family: 'Montserrat_700Bold';
  font-size: 40px;
  margin: 0px 6%;
  width: 50%;
`;

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
    const { workoutIds, name } = doc.data();

    if (workoutIds && name) {
      cycles.push({
        id: doc.id,
        name,
        workouts: workoutIds,
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
  const dispatch = useDispatch();
  useEffect(() => {
    const initializeDatabase = async () => {
      // Get the current logged in user id
      const currentUser = firebase.auth().currentUser.uid;

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
      dispatch(actions.workouts.initializeWorkouts(workouts));

      console.log('Home: Initializing Cycles store');
      dispatch(actions.cycles.initializeCycles(
        cycles,
        userData.selectedCycleId,
        userData.selectedCycleIndex,
      ));

      console.log('Home: Initialize Exercise store');
      dispatch(actions.exercises.initalizeExercises(exercises));

      console.log('Home: Initialize Dates store');
      dispatch(actions.dates.initializeRecordDates(userData.pastWorkoutDates));
    };

    initializeDatabase();
  }, []);

  const welcomeName = firebase.auth().currentUser.displayName;

  const workouts = useSelector((state) => state.workouts.workouts);
  const cycles = useSelector((state) => state.cycles);

  // Parse the database response into workoutList
  const workoutList = workouts.map((workout) => ({
    name: workout.name,
    lastPerformed: workout.lastPerformed,
    subtext: `${workout.lastPerformed} days ago`,
    id: workout.id,
    color: workout.color,
  }));

  // Filter the workout list to show only the 5 most recently performed workouts
  // If less than 5, display all workouts
  const filterWorkoutListForDisplay = () => {
    workoutList.sort((a, b) => {
      if (Number.isNaN(a.lastPerformed)) return 1;
      if (Number.isNaN(b.lastPerformed)) return -1;
      if (a.lastPerformed === b.lastPerformed) return 0;
      return (a.lastPerformed > b.lastPerformed ? 1 : -1);
    });
    workoutList.forEach((workout) => {
      if (Number.isNaN(workout.lastPerformed)) {
        /* eslint-disable no-param-reassign */
        workout.subtext = 'Try for first time!';
      }
    });
    return workoutList.slice(0, 5);
  };

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
        <WelcomeTitle>Hello</WelcomeTitle>
        <WelcomeTitle numberOfLines={1}>
          {welcomeName}
          !
        </WelcomeTitle>
      </View>
      <View style={{ height: '50%', marginBottom: '25%' }}>
        <CurrentCycle
          name={cycleDetails && cycleDetails[cycles.selectedCycleIndex].name}
          subtext={cycleDetails && cycleDetails[cycles.selectedCycleIndex].muscleGroups}
          color={cycleDetails && COLORS[cycles.selectedCycleIndex % COLORS.length]}
          leftPress={() => { dispatch(actions.cycles.decrementSelectedCycleIndex(cycleDetails.length)); }}
          rightPress={() => { dispatch(actions.cycles.incrementSelectedCycleIndex(cycleDetails.length)); }}
          id={cycleDetails && selectedCycle.workouts[cycles.selectedCycleIndex]}
          cycleLength={cycleDetails && cycleDetails.length}
          isCycleSelected={cycleDetails !== undefined}
        />
        <WorkoutSwipeList items={filterWorkoutListForDisplay(workoutList)} style={{ marginLeft: '10%' }} />
      </View>
    </SafeAreaView>

  );
};
