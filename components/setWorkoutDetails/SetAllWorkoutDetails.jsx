/* eslint-disable react/forbid-prop-types */
import * as React from 'react';
import { FlatList, View } from 'react-native';
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
    <View style={{ height: '100%' }}>
      <Title>Workouts</Title>
      <FlatList
        data={items}
        renderItem={renderCard}
        keyExtractor={(item, index) => item.name + index}
      />
    </View>
  );
};

SetAllWorkoutDetails.propTypes = {
  items: PropTypes.array.isRequired,
};

export default SetAllWorkoutDetails;
