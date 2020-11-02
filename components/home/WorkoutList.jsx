/* eslint-disable react/forbid-prop-types */
import * as React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import WorkoutContainer from './WorkoutContainer';

const Title = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 24px;
  margin: 0px 6%;
  paddingBottom: 15px
`;

const WorkoutList = (props) => {
  const { items } = props;

  const renderCard = ({ item }) => (
    <WorkoutContainer
      name={item.name}
      subtext={item.subtext}
      onIconPress={item.onIconPress}
      onPress={item.onPress}
      color={item.color}
    />
  );

  return (
    <View style = {{height: '100%'}}>
      <Title>Workouts</Title>
      <FlatList
        horizontal={true}
        data={items}
        renderItem={renderCard}
        keyExtractor={(item, index) => item.name + index}
      />
    </View>
  );
};

WorkoutList.propTypes = {
  items: PropTypes.array.isRequired,
};

export default WorkoutList;