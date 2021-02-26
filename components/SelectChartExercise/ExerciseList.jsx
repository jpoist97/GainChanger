import React, { useState } from 'react';
import {
  SafeAreaView, View, FlatList,
} from 'react-native';
import styled from 'styled-components/native';
import AlphabetSectionList from 'react-native-alphabet-sectionlist';
import { SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import ExerciseItem from './ExerciseItem';
import actions from '../../actions/index';
import { COLORS } from '../../constants';

const Title = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 24px;
  margin: 15px 5%;
`;

const SectionHeader = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 20px;
  padding-left: 2%;
  background-color: ${(props) => props.color};
  color: #EFEFEF;
`;

const ExerciseList = ({ onExerciseSelect, parsedItems, exerciseObjects }) => {
  const [dataState, setDataState] = useState({ filteredDataSource: [], masterDataSource: parsedItems });
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const exerciseRecords = useSelector((state) => state.progress.exerciseRecords);
  const colorTheme = useSelector((state) => state.settings.colorTheme);
  const dispatch = useDispatch();
  // Dispatch the action to load exerciseRecords on Press of the exercise Card

  const renderHeader = ({ section }) => {

    return (
      <SectionHeader color={COLORS[colorTheme][0]}>{section.title}</SectionHeader>
    );
  };

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
        if (!exerciseRecords[item.id]) {
          dispatch(actions.progress.fetchExerciseRecords(item.id));
        }
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
  parsedItems: PropTypes.object,
  exerciseObjects: PropTypes.array,
};

ExerciseList.defaultProps = {
  parsedItems: {},
  exerciseObjects: [],
};
export default ExerciseList;
