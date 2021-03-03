import React, { useEffect } from 'react';
import {
  SafeAreaView, Image, View,
} from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import * as firebase from 'firebase';
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import CurrentCycle from './CurrentCycle';
import WorkoutSwipeList from './WorkoutSwipeList';
import 'firebase/firestore';
import actions from '../../actions/index';
import { COLORS, LOGOS } from '../../constants/index';

const WelcomeTitle = styled.Text`
  font-family: 'Montserrat_700Bold';
  font-size: 40px;
  margin: 0px 6%;
  width: 50%;
`;

export default () => {
  const dispatch = useDispatch();
  const welcomeName = firebase.auth().currentUser.displayName;

  const workouts = useSelector((state) => state.workouts.workouts);
  const cycles = useSelector((state) => state.cycles);
  const colorTheme = useSelector((state) => state.settings.colorTheme);

  const imgPath = LOGOS[colorTheme];

  // Request notifications on app first load
  useEffect(() => {
    const checkPermissions = async () => {
      const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

      if (status !== 'granted') {
        Permissions.askAsync(Permissions.NOTIFICATIONS);
      }
    };
    checkPermissions();
  }, []);

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
      if (Number.isNaN(workout.lastPerformed) || workout.lastPerformed === 'n/a') {
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
        source={imgPath}
        style={{
          width: 215,
          height: 215,
          position: 'absolute',
          right: 10,
          top: 20,
        }}
      />
      <View style={{ marginBottom: '10%', marginTop: '5%', marginLeft: '5%' }}>
        <Animatable.Text animation="bounceIn" iterationCount={1}>
          <WelcomeTitle>Hello</WelcomeTitle>
          {' '}

        </Animatable.Text>
        <Animatable.Text animation="bounceIn" iterationCount={1}>
          <WelcomeTitle numberOfLines={1}>
            {welcomeName}
            !
          </WelcomeTitle>
        </Animatable.Text>
      </View>
      <View style={{ height: '50%', marginBottom: '25%' }}>
        <CurrentCycle
          name={cycleDetails && cycleDetails[cycles.selectedCycleIndex].name}
          subtext={cycleDetails && cycleDetails[cycles.selectedCycleIndex].muscleGroups}
          color={cycleDetails && COLORS[colorTheme][cycles.selectedCycleIndex % (COLORS[colorTheme].length - 1)]}
          leftPress={() => { dispatch(actions.cycles.decrementSelectedCycleIndex(cycles.selectedCycleIndex, cycleDetails.length)); }}
          rightPress={() => { dispatch(actions.cycles.incrementSelectedCycleIndex(cycles.selectedCycleIndex, cycleDetails.length)); }}
          id={cycleDetails && selectedCycle.workouts[cycles.selectedCycleIndex]}
          cycleLength={cycleDetails && cycleDetails.length}
          isCycleSelected={cycleDetails !== undefined}
        />
        <WorkoutSwipeList items={filterWorkoutListForDisplay(workoutList)} style={{ marginLeft: '10%' }} />
      </View>
    </SafeAreaView>
  );
};
