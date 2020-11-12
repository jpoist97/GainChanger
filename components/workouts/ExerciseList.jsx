/* eslint-disable react/forbid-prop-types */
import * as React from 'react';
import { View, Text} from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import AlphabetSectionList from 'react-native-alphabet-sectionlist';
import _ from 'lodash';
import { ToggleButton } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import ExerciseItem from './ExerciseItem'

const Title = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 24px;
  margin: 15px 5%;
`;

const SectionHeader = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 20px;
  padding-left: 2%;
  background-color: #CAB0FF;
  color: #EFEFEF;

`;


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

const renderCard = ({ item }) => (
    <ExerciseItem
        name = {item.name}
        subtext = {item.subtext}
    ></ExerciseItem>
);


const renderHeader = ({ section }) => (
    <SectionHeader>{section.title}</SectionHeader>
)

const ExerciseList = (props) => {
  const { items } = props;

  const parsedItems = parseItems(items);

  const [status, setStatus] = React.useState('checked')
  const onButtonToggle = value => {
      setStatus(status=='checked' ? 'unchecked': 'checked');
  }

  return (
    <View style={{ height: '100%' }}>
      <Title>Exercises</Title>
      <AlphabetSectionList
        data={parsedItems}
        renderItem={renderCard}
        renderSectionHeader={renderHeader}
      />
    </View>
  );
};

ExerciseList.propTypes = {
  items: PropTypes.array.isRequired,
};

export default ExerciseList;