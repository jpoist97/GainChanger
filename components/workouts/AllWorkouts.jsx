/* eslint-disable react/forbid-prop-types */
import * as React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import WorkoutCard from './WorkoutCard';
import AlphabetList from "react-native-section-alphabet-list";
import Temp from './temp';

const Title = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 24px;
  margin: 15px 5%;
`;

const SectionHeader = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 20px;
`;

const parseItems = (items) => items.map((item) => {
  return {
    ...item,
    value: item.name,
    key: item.name + item.subtext,
  }
})

const AllWorkouts = (props) => {
  const { items } = props;

  const parsedItems = parseItems(items);

  const renderCard = (item) => (
    <WorkoutCard
      name={item.name}
      subtext={item.subtext}
      displayEllipses={item.displayEllipses}
      onIconPress={item.onIconPress}
      onPress={item.onPress}
      color={item.color}
    />
  );

  const renderSectionHeader = (section) => (
    <SectionHeader>{section.title}</SectionHeader>
  )

  return (
    <View style={{ height: '100%' }}>
      <Title>Workouts</Title>
      <AlphabetList 
        data={parsedItems}
        renderItem={renderCard}
        renderSectionHeader={renderSectionHeader}
        getItemHeight={() => 180}
        sectionHeaderHeight={30}
        />
        {/* <Temp/> */}
      {/* <FlatList
        data={items}
        renderItem={renderCard}
        keyExtractor={(item, index) => item.name + index}
        columnWrapperStyle={{ justifyContent: 'space-evenly' }}
        numColumns={2}
      /> */}
    </View>
  );
};

AllWorkouts.propTypes = {
  items: PropTypes.array.isRequired,
};

export default AllWorkouts;
