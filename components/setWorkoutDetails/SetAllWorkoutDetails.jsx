/* eslint-disable react/forbid-prop-types */
import * as React from 'react';
import { View } from 'react-native';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import SetWorkoutDetailsCard from './SetWorkoutDetailsCard';

const Title = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 24px;
  margin: 0px 5% 5px 5%;
`;

const SetAllWorkoutDetails = (props) => {
  const {
    items, setReps, setSets, setSeconds, removeExercise,
  } = props;

  const renderCard = ({ item, index }) => (

    <SetWorkoutDetailsCard
      name={item.name}
      displayEllipses={item.displayEllipses}
      color={item.color}
      sets={item.sets}
      reps={item.reps}
      seconds={item.seconds}
      setReps={setReps(index)}
      setSets={setSets(index)}
      setSeconds={setSeconds(index)}
      removeExercise={removeExercise(index)}
    />
  );

  return (
    <View style={{ height: '92%' }}>
      <Title>Exercises</Title>
      <KeyboardAwareFlatList
        data={items}
        renderItem={renderCard}
        keyExtractor={(item, index) => item.name + index}
        keyboardOpeningTime={300}
      />
    </View>

  );
};

SetAllWorkoutDetails.propTypes = {
  items: PropTypes.array.isRequired,
};

export default SetAllWorkoutDetails;
