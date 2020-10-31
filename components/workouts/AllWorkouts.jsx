/* eslint-disable react/forbid-prop-types */
import * as React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import WorkoutCard from './WorkoutCard';

const Title = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 24px;
  margin: 15px 5%;
`;

const AllWorkouts = (props) => {
  const { items } = props;

  const renderCard = ({ item }) => (
    <WorkoutCard
      name={item.name}
      subtext={item.subtext}
      displayEllipses={item.displayEllipses}
      onIconPress={item.onIconPress}
      onPress={item.onPress}
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
        columnWrapperStyle={{ justifyContent: 'space-evenly' }}
        numColumns={2}
      />
    </View>
  );
};

AllWorkouts.propTypes = {
  items: PropTypes.array.isRequired,
};

export default AllWorkouts;
