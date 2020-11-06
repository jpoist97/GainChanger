/* eslint-disable react/forbid-prop-types, react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import SetDetails from './SetDetails';
import LogHeader from './LogHeader';
import PlusButton from '../utils/PlusButton';

const ExerciseName = styled.Text`
  font-family: 'Montserrat_500Medium'
  font-size: 26px;
  color: #FFF;
  margin: 15px;
`;

const Container = styled.View`
  border-radius: 20px;
  margin: 10px 3%;
  box-shadow: 3px 5px 2px #00000050;
`;

const ButtonFlexContainer = styled.View`
  align-items: flex-end;
  margin: 10px;
`;

const AddSetButton = styled(PlusButton)`
  padding: 5px 10px;
`;

const ExerciseDetails = (props) => {
  const {
    items, updateReps, updateWeight, updateCompleted, onSetAdd, onSetDelete, name, color,
  } = props;

  return (
    <Container style={{ backgroundColor: color }}>
      <ExerciseName>{name}</ExerciseName>
      <LogHeader />
      {items.map((set, index) => (
        <SetDetails
          prevWeight={set.prevWeight}
          prevReps={set.prevReps}
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
      <ButtonFlexContainer>
        <AddSetButton size={16} title="Add Set" onPress={onSetAdd} />
      </ButtonFlexContainer>

    </Container>
  );
};

ExerciseDetails.propTypes = {
  items: PropTypes.array.isRequired,
  updateReps: PropTypes.func.isRequired,
  updateCompleted: PropTypes.func.isRequired,
  updateWeight: PropTypes.func.isRequired,
  onSetAdd: PropTypes.func.isRequired,
  onSetDelete: PropTypes.func.isRequired,
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
};

ExerciseDetails.defaultProps = {
  color: '#CAB0FF',
};

export default ExerciseDetails;
