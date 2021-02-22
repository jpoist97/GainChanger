import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import SetDetails from './SetDetails';
import ExerciseDetailsHeader from './ExerciseDetailsHeader';
import PlusButton from '../utils/PlusButton';
import * as Notifications from 'expo-notifications';
import { useSelector } from 'react-redux';
import * as Haptics from 'expo-haptics';

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
    items, updateDuration, updateWeight, updateCompleted, onSetAdd, onSetDelete, name, color, type,
  } = props;

  // Update to be using redux
  const restTime = 70;

  const scheduleNotification = async (timeout) => {
    await Notifications.cancelAllScheduledNotificationsAsync();

    const content = {
      title: 'Rest finished, start your next set',
    }
    Notifications.scheduleNotificationAsync({ content, trigger: { seconds: timeout }});
  }

  return (
    <Container style={{ backgroundColor: color }}>
      <ExerciseName>{name}</ExerciseName>
      <ExerciseDetailsHeader type={type} />
      {items.map((set, index) => (
        <SetDetails
          prevWeight={set.prevWeight}
          prevDuration={set.prevDuration}
          weight={set.weight}
          duration={set.duration}
          onDurationChange={updateDuration(index)}
          onWeightChange={updateWeight(index)}
          onCompletedPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            if(!set.completed) {
              scheduleNotification(restTime);
            }
            
            const updateHandler = updateCompleted(index);
            updateHandler();
          }}
          onSetDelete={onSetDelete(index)}
          completed={set.completed}
          setNumber={index + 1}
          // eslint-disable-next-line react/no-array-index-key
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
  updateDuration: PropTypes.func.isRequired,
  updateCompleted: PropTypes.func.isRequired,
  updateWeight: PropTypes.func.isRequired,
  onSetAdd: PropTypes.func.isRequired,
  onSetDelete: PropTypes.func.isRequired,
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
};

ExerciseDetails.defaultProps = {
  color: '#CAB0FF',
  type: 'REPS',
};

export default ExerciseDetails;
