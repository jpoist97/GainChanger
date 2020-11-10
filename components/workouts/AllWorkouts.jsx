/* eslint-disable react/forbid-prop-types */
import * as React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import AlphabetSectionList from 'react-native-alphabet-sectionlist';
import _ from 'lodash';
import WorkoutCard from './WorkoutCard';

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

const WorkoutCardPair = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 10px;
`;

const parseItems = (items) => {
  items.sort((a, b) => a.name.localeCompare(b.name));

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

  const pairedBucketData = _.mapValues(bucketData, (data) => {
    const pairData = [];
    for (let i = 0; i < data.length; i += 2) {
      pairData.push({ left: data[i], right: data[i + 1] });
    }
    return pairData;
  });

  return pairedBucketData;
};

const renderCard = ({ item: { left, right } }) => (
  <WorkoutCardPair>
    <WorkoutCard
      name={left.name}
      subtext={left.subtext}
      displayEllipses={left.displayEllipses}
      onIconPress={left.onIconPress}
      onPress={left.onPress}
      color={left.color}
      key={left.name + left.subtext}
    />
    {right ? (
      <WorkoutCard
        name={right.name}
        subtext={right.subtext}
        displayEllipses={right.displayEllipses}
        onIconPress={right.onIconPress}
        onPress={right.onPress}
        color={right.color}
        key={right.name + right.subtext}
      />
    ) : (
      <WorkoutCard
        color="#00000000"
        name=""
        displayEllipses={false}
      />
    )}
  </WorkoutCardPair>

);

const renderHeader = ({ section }) => (
  <SectionHeader>{section.title}</SectionHeader>
);

const AllWorkouts = (props) => {
  const { items } = props;

  const parsedItems = parseItems(items);

  return (
    <View style={{ height: '100%' }}>
      <Title>Workouts</Title>
      <AlphabetSectionList
        data={parsedItems}
        renderItem={renderCard}
        renderSectionHeader={renderHeader}
      />
    </View>
  );
};

AllWorkouts.propTypes = {
  items: PropTypes.array.isRequired,
};

export default AllWorkouts;
