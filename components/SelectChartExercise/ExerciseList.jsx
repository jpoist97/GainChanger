import React, { useState } from 'react';
import {
  SafeAreaView, View, TouchableOpacity, FlatList,
} from 'react-native';
import styled from 'styled-components/native';
import AlphabetSectionList from 'react-native-alphabet-sectionlist';
import { SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import ExerciseItem from './ExerciseItem';

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

const renderHeader = ({ section }) => (
  <SectionHeader>{section.title}</SectionHeader>
);

const ExerciseList = ({
  onExerciseSelect, parsedItemsName, exerciseObjects,
}) => {
  const [dataState, setDataState] = useState({ filteredDataSource: [], masterDataSource: parsedItemsName });
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  // Dispatch the action to load exerciseRecords on Press of the exercise Card

  const searchFilterFunction = (text) => {
    if (text) {
      const textData = text.toUpperCase();
      const newData = exerciseObjects.filter((item) => {
        const itemData = item.name
          ? item.name.toUpperCase()
          : '';
        return itemData.indexOf(textData) > -1;
      });
      newData.sort((a, b) => a.name.localeCompare(b.name));
      setDataState({ ...dataState, filteredDataSource: newData });
      setSearch(text);
    } else {
      setDataState({ ...dataState, filteredDataSource: dataState.masterDataSource });
      setSearch(text);
    }
  };

  const renderCard = ({ item }) => (
    <ExerciseItem
      name={item.name}
      subtext={item.subtext}
      selected={item.selected}
      onPress={() => {
        onExerciseSelect(item.id, item.name);
        //TODOL dispatch exerciseRecord action with item.id
        navigation.goBack();
      }}
    />
  );

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <Title>Exercises</Title>
      <View style={{ height: '92%' }}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={() => searchFilterFunction('')}
          value={search}
          platform="ios"
          containerStyle={{ backgroundColor: '#f2f2f2', width: '100%' }}
        />
        {search
          ? (
            <FlatList
              data={dataState.filteredDataSource}
              keyExtractor={(item) => item.id}
              renderItem={renderCard}
            />
          )
          : (
            <AlphabetSectionList
              data={dataState.masterDataSource}
              renderItem={renderCard}
              renderSectionHeader={renderHeader}
            />
          )}
      </View>
    </SafeAreaView>
  );
};

ExerciseList.propTypes = {
  parsedItemsName: PropTypes.object,
  parsedItemsMuscleGroups: PropTypes.object,
  exerciseObjects: PropTypes.array,
};

ExerciseList.defaultProps = {
  parsedItemsName: {},
  parsedItemsMuscleGroups: {},
  exerciseObjects: [],
};
export default ExerciseList;
