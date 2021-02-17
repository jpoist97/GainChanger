import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import * as firebase from 'firebase';
import { toDate, differenceInCalendarDays } from 'date-fns';
import 'firebase/firestore';
import actions from '../../actions/index';

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
        muscleGroups,
      });
    }
  });

  return exercises;
};

export default ({ navigation }) => {
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

      console.log('Home: Initialize Progress store');
      dispatch(actions.progress.initalizeProgressStore(userData.totalWeightLifted, userData.totalWorkoutsPerformed, userData.weightPersonalRecord));
      
      navigation.navigate('Root');
    };

    initializeDatabase();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 255 }}>
      <Animatable.View animation="rotate" iterationCount="infinite">
        <Image
          source={require('../../assets/logo.png')}
          style={{
            width: 310,
            height: 310,
          }}
        />
      </Animatable.View>
    </View>
  );
};
