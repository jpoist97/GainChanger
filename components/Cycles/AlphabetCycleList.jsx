/* eslint-disable react/forbid-prop-types */
import * as React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import AlphabetSectionList from 'react-native-alphabet-sectionlist';
import { useDispatch, useSelector } from 'react-redux';
import CycleCard from './CycleCard';
import { DELETE_CYCLE, SELECT_NEW_CYCLE } from '../../constants';

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

const parseItems = (items, selectedCycle) => {
  // Sort names alphabetically
  items.sort((a, b) => a.name.localeCompare(b.name));

  // The second argument here is the initial accumulator, if there is a
  // selected cycle we want that to be in the initial accumulator, if not
  // we want an empty object as the initial accumulator
  const bucketData = items.reduce((accumulator, item) => {
    const bucket = item.name[0].toUpperCase();

    // If this is the first time we've seen this letter, create a bucket
    if (!accumulator[bucket]) {
      accumulator[bucket] = [item];
    } else {
      accumulator[bucket].push(item);
    }

    return accumulator;
  }, (selectedCycle ? { 'Selected Cycle': [selectedCycle] } : {}));

  return bucketData;
};

const AlphabetCycleList = (props) => {
  const dispatch = useDispatch();
  const { items, selectedCycle } = props;

  const parsedItems = parseItems(items, selectedCycle);

  const renderCard = ({ item }) => (
    <CycleCard
      name={item.name}
      subtext={item.subtext}
      selectCycle={() => dispatch({ type: SELECT_NEW_CYCLE, cycleId: item.id })}
      deleteCycle={() => dispatch({ type: DELETE_CYCLE, cycleId: item.id })}
      onPress={item.onPress}
      color={item.color}
    />
  );

  return (
    <View style={{ height: '100%' }}>
      <Title>Cycles</Title>
      <AlphabetSectionList
        data={parsedItems}
        renderItem={renderCard}
        renderSectionHeader={renderHeader}
        getRightSectionListTitle={(title) => (title === 'Selected Cycle' ? '' : title)}
      />
    </View>
  );
};

AlphabetCycleList.propTypes = {
  items: PropTypes.array.isRequired,
  selectedCycle: PropTypes.object,
};

AlphabetCycleList.defaultProps = {
  selectedCycle: undefined,
};

export default AlphabetCycleList;
