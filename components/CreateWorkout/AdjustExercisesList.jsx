/* eslint-disable react/forbid-prop-types */
import * as React from 'react';
import { View } from 'react-native';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import AdjustExerciseCard from './AdjustExerciseCard';

const Title = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 24px;
  margin: 0px 5% 5px 5%;
`;

const AdjustExercisesList = (props) => {
  const {
    items, setReps, setSets, setSeconds, removeExercise, toggleType,
  } = props;

  const renderCard = ({ item, index }) => (

    <AdjustExerciseCard
      name={item.name}
      displayEllipses={item.displayEllipses}
      color={item.color}
      sets={item.sets}
      reps={item.reps}
      seconds={item.seconds}
      isReps={item.isReps}
      setReps={setReps(index)}
      setSets={setSets(index)}
      setSeconds={setSeconds(index)}
      toggleType={toggleType(index)}
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

AdjustExercisesList.propTypes = {
  items: PropTypes.array.isRequired,
};

export default AdjustExercisesList;
