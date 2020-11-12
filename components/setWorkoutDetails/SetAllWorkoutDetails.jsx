/* eslint-disable react/forbid-prop-types */
import * as React from 'react';
import { FlatList, View } from 'react-native';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import SetWorkoutDetailsCard from './SetWorkoutDetailsCard';

const Title = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 24px;
  margin: 15px 5%;
`;

const SetAllWorkoutDetails = (props) => {
  const { items } = props;

  const renderCard = ({ item }) => (
    <SetWorkoutDetailsCard
      name={item.name}
      displayEllipses={item.displayEllipses}
      onIconPress={item.onIconPress}
      color={item.color}
    />
  );

  return (
    <View style={{ height: '92%' }}>
      <Title>Workouts</Title>
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
