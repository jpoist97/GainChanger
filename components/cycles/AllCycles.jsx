/* eslint-disable react/forbid-prop-types */
import * as React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import AlphabetSectionList from 'react-native-alphabet-sectionlist';
import CycleCard from './CycleCard';

const Title = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 24px;
  margin: 15px 5%;
`;

const SectionHeader = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 20px;
  margin-bottom: 15px;
  padding-left: 5%;
  background-color: rgb(242, 242, 242);
`;

const renderHeader = ({ section }) => (
  <SectionHeader>{section.title}</SectionHeader>
);

const renderCard = ({ item }) => (
  <CycleCard
    name={item.name}
    subtext={item.subtext}
    deleteCycle={item.deleteCycle}
    onPress={item.onPress}
    color={item.color}
  />
);

const parseItems = (items) => {
  // Sort names alphabetically
  items.sort((a, b) => a.name.localeCompare(b.name));

  // Group by first letter of each name
  const bucketData = items.reduce((accumulator, item) => {
    const bucket = item.name[0].toUpperCase();

    // If this is the first time we've seen this letter, create a bucket
    if (!accumulator[bucket]) {
      accumulator[bucket] = [item];
    } else {
      accumulator[bucket].push(item);
    }

    return accumulator;
  }, {});

  return bucketData;
};

const AllCycles = (props) => {
  const { items } = props;

  const parsedItems = parseItems(items);

  return (
    <View style={{ height: '100%' }}>
      <Title>Cycles</Title>
      <AlphabetSectionList
        data={parsedItems}
        renderItem={renderCard}
        renderSectionHeader={renderHeader}
      />
    </View>
  );
};

AllCycles.propTypes = {
  items: PropTypes.array.isRequired,
};

export default AllCycles;
