/* eslint-disable react/forbid-prop-types, react/no-array-index-key */
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import ExerciseDetails from './ExerciseDetails';
import FinishButton from '../utils/FinishButton';

const StyledFinishButton = styled(FinishButton)`
  position: absolute;
  top: 65px;
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
  sets: exercise.sets.map((set) => ({
    prevWeight: set.weight,
    weight: '',
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
  const { exercises, name } = props;

  const initialExerciseState = parseExercises(exercises);

  const [exerciseState, setExerciseState] = useState(initialExerciseState);

  const curryUpdateReps = (exerciseIndex) => (setIndex) => (reps) => {
    const newExercise = [...exerciseState];

    newExercise[exerciseIndex].sets[setIndex].reps = reps;
    setExerciseState(newExercise);
  };

  const curryUpdateWeight = (exerciseIndex) => (setIndex) => (weight) => {
    const newExercise = [...exerciseState];

    newExercise[exerciseIndex].sets[setIndex].weight = weight;
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
      weight: lastSet.weight,
      prevWeight: lastSet.prevWeight,
      reps: lastSet.reps,
      prevReps: lastSet.prevReps,
      completed: false,
    });
    setExerciseState(newExercise);
  };

  const curryDeleteSet = (exerciseIndex) => (setIndex) => () => {
    const newExercise = [...exerciseState];

    _.remove(newExercise[exerciseIndex].sets, (val, index) => index === setIndex);
    setExerciseState(newExercise);
  };

  const renderExerciseDetail = ({ item, index }) => (
    <ExerciseDetails
      name={item.name}
      items={item.sets}
      color={item.color}
      updateReps={curryUpdateReps(index)}
      updateWeight={curryUpdateWeight(index)}
      updateCompleted={curryUpdateCompleted(index)}
      onSetAdd={curryAddSet(index)}
      onSetDelete={curryDeleteSet(index)}
    />
  );

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <TitleText>{name}</TitleText>
      <StyledFinishButton onPress={() => alert(`Top set has ${exerciseState[0].sets[0].weight} lbs by ${exerciseState[0].sets[0].reps} reps`)} />
      <KeyboardAwareFlatList
        style={{ height: '100%' }}
        data={exerciseState}
        renderItem={renderExerciseDetail}
        keyExtractor={(item, index) => item.name + index}
        keyboardOpeningTime={100}
        // this is for a react navigation bug making it not smooth scroll
        extraHeight={-64}
      />
    </SafeAreaView>
  );
};

LogWorkout.propTypes = {
  exercises: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
};

export default LogWorkout;
