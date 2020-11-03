/* eslint-disable react/forbid-prop-types */
import * as React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import CycleCard from './CycleCard';

const Title = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 24px;
  margin: 15px 5%;
`;

const AllCycles = (props) => {
  const { items } = props;

  const renderCard = ({ item }) => (
    <CycleCard
      name={item.name}
      subtext={item.subtext}
      onIconPress={item.onIconPress}
      onPress={item.onPress}
      color={item.color}
    />
  );

  return (
    <View style={{ height: '100%' }}>
      <Title>Cycles</Title>
      <FlatList
        data={items}
        renderItem={renderCard}
        keyExtractor={(item, index) => item.name + index}
        numColumns={1}
      />
    </View>
  );
};

AllCycles.propTypes = {
  items: PropTypes.array.isRequired,
};

export default AllCycles;
