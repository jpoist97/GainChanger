/* eslint-disable react/forbid-prop-types, react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import ExerciseDetails from './ExerciseDetails';
import FinishButton from '../utils/FinishButton';
import ModalWapper from '../utils/ModalScreenWrapper';

const StyledFinishButton = styled(FinishButton)`
  position: absolute;
  top: 85px;
  right: 20px;
`;

const TitleText = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 24px;
  margin: 15px 15px;
`;

const parseExercises = (exercises) => exercises.map((exercise) => ({
  name: exercise.name,
  color: exercise.color,
  type: exercise.type,
  sets: exercise.sets.map((set) => ({
    prevPerRep: set.perRep,
    perRep: '',
    prevReps: set.reps,
    reps: '',
    completed: false,
  })),
}));

/**
 * The exercises prop expect and object with the following formatting.
 * The weight and reps of each set it the previous weight/rep count.
 * {
 *    name: String,
 *    color: String,
 *    sets: [{ weight: String, reps: String }]
 * }
 *
 */
const LogWorkout = (props) => {
  const { route: { params: { workoutId } } } = props;

  // get the workout details from redux based on workoutid
  console.log(`Opening Log Workout for workout id ${workoutId}`);
  const name = 'Workout Name';
  const exercises = [{
    name: 'Bicep Curls',
    type: 'WEIGHT',
    sets: [{
      perRep: '30', reps: '8',
    }, {
      perRep: '30', reps: '8',
    }, {
      perRep: '30', reps: '8',
    }, {
      perRep: '30', reps: '8',
    }],
  }, {
    name: 'Rows',
    color: '#6D8DFF',
    type: 'WEIGHT',
    sets: [{
      perRep: '150', reps: '12',
    }, {
      perRep: '150', reps: '12',
    }, {
      perRep: '150', reps: '12',
    }, {
      perRep: '150', reps: '12',
    }],
  }, {
    name: 'Reverse Fly',
    color: '#9D8DFF',
    type: 'WEIGHT',
    sets: [{
      perRep: '25', reps: '20',
    }, {
      perRep: '25', reps: '20',
    }, {
      perRep: '25', reps: '20',
    }, {
      perRep: '25', reps: '20',
    }],
  },
  {
    name: 'Plank',
    type: 'TIME',
    sets: [{
      perRep: '60', reps: '1',
    }],
  },
  ];

  const navigation = useNavigation();
  const initialExerciseState = parseExercises(exercises);

  const [exerciseState, setExerciseState] = useState(initialExerciseState);

  const curryUpdateReps = (exerciseIndex) => (setIndex) => (reps) => {
    const newExercise = [...exerciseState];

    newExercise[exerciseIndex].sets[setIndex].reps = reps;
    setExerciseState(newExercise);
  };

  const curryUpdatePerRep = (exerciseIndex) => (setIndex) => (perRep) => {
    const newExercise = [...exerciseState];

    newExercise[exerciseIndex].sets[setIndex].perRep = perRep;
    setExerciseState(newExercise);
  };

  const curryUpdateCompleted = (exerciseIndex) => (setIndex) => () => {
    const newExercise = [...exerciseState];
    const { completed } = newExercise[exerciseIndex].sets[setIndex];

    newExercise[exerciseIndex].sets[setIndex].completed = !completed;
    setExerciseState(newExercise);
  };

  const curryAddSet = (exerciseIndex) => () => {
    const newExercise = [...exerciseState];
    const { sets } = newExercise[exerciseIndex];

    // Grab the last set for this exercise and mimic it
    const lastSet = _.last(sets);
    newExercise[exerciseIndex].sets.push({
      perRep: lastSet.perRep,
      prevPerRep: lastSet.prevPerRep,
      reps: lastSet.reps,
      prevReps: lastSet.prevReps,
      completed: false,
    });
    setExerciseState(newExercise);
  };

  const curryDeleteSet = (exerciseIndex) => (setIndex) => () => {
    const newExercise = [...exerciseState];
    const selectedExercise = exerciseState[exerciseIndex];

    // Check if this is the last set left
    if (selectedExercise.sets.length === 1) {
      alert('You cannot delete the last set of a workout');
    } else {
      _.remove(newExercise[exerciseIndex].sets, (val, index) => index === setIndex);
      setExerciseState(newExercise);
    }
  };

  const renderExerciseDetail = ({ item, index }) => (
    <ExerciseDetails
      name={item.name}
      items={item.sets}
      color={item.color}
      type={item.type}
      updateReps={curryUpdateReps(index)}
      updatePerRep={curryUpdatePerRep(index)}
      updateCompleted={curryUpdateCompleted(index)}
      onSetAdd={curryAddSet(index)}
      onSetDelete={curryDeleteSet(index)}
    />
  );

  return (
    <ModalWapper>
      <TitleText>{name}</TitleText>
      <StyledFinishButton onPress={() => {
        // Update Redux and database
        navigation.goBack();
      }}
      />
      <KeyboardAwareFlatList
        style={{ height: '100%' }}
        data={exerciseState}
        renderItem={renderExerciseDetail}
        keyExtractor={(item, index) => item.name + index}
        keyboardOpeningTime={100}
        // this is for a react navigation bug making it not smooth scroll
        extraHeight={-64}
      />
    </ModalWapper>
  );
};

LogWorkout.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      workoutId: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default LogWorkout;
