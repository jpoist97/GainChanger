/* eslint-disable react/forbid-prop-types, react/no-array-index-key */
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import SetDetails from './SetDetails';

const ExerciseDetails = (props) => {
  const {
    items, updateReps, updateWeight, updateCompleted, onSetAdd, onSetDelete,
  } = props;

  return (
    <View>
      {items.map((set, index) => (
        <SetDetails
          prevWeight={set.prevWeight}
          weight={set.weight}
          reps={set.reps}
          onRepChange={updateReps(index)}
          onWeightChange={updateWeight(index)}
          onCompletedPress={updateCompleted(index)}
          onSetDelete={onSetDelete(index)}
          completed={set.completed}
          setNumber={index + 1}
          key={index}
        />
      ))}
      <Button onPress={onSetAdd}>Add Set</Button>
    </View>
  );
};

ExerciseDetails.propTypes = {
  items: PropTypes.array.isRequired,
  updateReps: PropTypes.func.isRequired,
  updateCompleted: PropTypes.func.isRequired,
  updateWeight: PropTypes.func.isRequired,
  onSetAdd: PropTypes.func.isRequired,
  onSetDelete: PropTypes.func.isRequired,
};

export default ExerciseDetails;
