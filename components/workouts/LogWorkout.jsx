/* eslint-disable react/forbid-prop-types, react/no-array-index-key */
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';
import lodash from 'lodash';
import ExerciseDetails from './ExerciseDetails';

/**
 * Required Props are exercises, a 2D array representing exercises and sets.
 * Each index in the 2D array represents and exercise and each index inside of
 * that array represents a set.
 *
 * Each exercise must be an object with the following format:
 * {
 *    name: String,
 *    sets: (Array of Set objects),
 * }
 *
 * Each set must be an object with the following format:
 * {
 *    prevWeight: String/Number,
 *    weight: String/Number,
 *    reps: String/Number,
 *    completed: boolean,
 * }
 */
const LogWorkout = (props) => {
  const { exercises } = props;

  const [exerciseState, setExerciseState] = useState(exercises);

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

    newExercise[exerciseIndex].sets.push({ weight: '', reps: '', completed: false });

    setExerciseState(newExercise);
  };

  const curryDeleteSet = (exerciseIndex) => (setIndex) => () => {
    const newExercise = [...exerciseState];
    lodash.remove(newExercise[exerciseIndex].sets, (val, index) => index === setIndex);
    setExerciseState(newExercise);
  };

  return (
    <View>
      <Button onPress={() => alert(exerciseState[0].sets[0].reps)}>save</Button>
      {exerciseState.map((exercise, index) => (
        <View>
          <Text>{exercise.name}</Text>
          <ExerciseDetails
            items={exercise.sets}
            key={index}
            updateReps={curryUpdateReps(index)}
            updateWeight={curryUpdateWeight(index)}
            updateCompleted={curryUpdateCompleted(index)}
            onSetAdd={curryAddSet(index)}
            onSetDelete={curryDeleteSet(index)}
          />
        </View>
      ))}
    </View>
  );
};

LogWorkout.propTypes = {
  exercises: PropTypes.array.isRequired,
};

export default LogWorkout;
