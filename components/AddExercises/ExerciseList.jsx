import React, { useState } from 'react';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import AlphabetSectionList from 'react-native-alphabet-sectionlist';
import { SearchBar } from 'react-native-elements';
import { TabRouter, useNavigation } from '@react-navigation/native';
import ExerciseItem from './ExerciseItem';
import SortByPopup from '../utils/SortByPopup';

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

const ButtonContainer = styled(TouchableOpacity)`
   background-color: #E2E2E2;
   border-radius: 20px;
   padding: 5px;
   padding-left: 15px;
   padding-right: 15px;
   position: absolute;
   top: 14px;
   right: 20px;
`;

const Buttontext = styled.Text`
  font-family: 'Montserrat_500Medium';
  font-size: 18px;
`;

const SortByButton = styled(SortByPopup)`
  position: absolute;
  right: 15px;
  top: 22px;
  height: 35px;
  width: 35px;
  margin: 0px 15px 0px 0px;
`;

const renderHeader = ({ section }) => (
  <SectionHeader>{section.title}</SectionHeader>
);

const ExerciseList = ({ onExercisesAdd, parsedItemsName, parsedItemsMuscleGroups }) => {
  //const [isSortByMuscleGroup, setIsSortByMuscleGroup] = React.useState(false);
  const [dataState, setDataState] = useState({isSortByMuscleGroup : false, filteredDataSource: parsedItemsName, masterDataSource: parsedItemsName})
  // const isSortByMuscleGroup = React.useRef(false);
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  //const [filteredDataSource, setFilteredDataSource] = React.useState(parsedItemsName);
  //const [masterDataSource, setMasterDataSource] = React.useState(parsedItemsName);
  const [exerciseCount, setExerciseCount] = useState(0);
  const [addedExercises] = useState([]);

  function toggleSort() {
    console.log("HELLO")
    console.log(dataState.isSortByMuscleGroup)
    if(dataState.isSortByMuscleGroup) {
      console.log("CODE GOES HERE")
      setDataState({...dataState, filteredDataSource: parsedItemsMuscleGroups, masterDataSource: parsedItemsMuscleGroups})
      // setFilteredDataSource(parsedItemsMuscleGroups);
      // setMasterDataSource(parsedItemsMuscleGroups);
    } else {
      setDataState({...dataState, filteredDataSource: parsedItemsName, masterDataSource: parsedItemsName})
      // setFilteredDataSource(parsedItemsName);
      // setMasterDataSource(parsedItemsName);
    }
  }

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const firstLetter = text[0].toUpperCase();
      if (dataState.masterDataSource[firstLetter]) {
        const newData = dataState.masterDataSource[firstLetter].filter((item) => {
          const itemData = item.name
            ? item.name.toUpperCase()
            : '';
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        const filteredData = {};
        filteredData[firstLetter] = newData;
        setDataState({...dataState, filteredDataSource: filteredData})
        //setFilteredDataSource(filteredData);
        setSearch(text);
      } else {
        setDataState({...dataState, filteredDataSource: {}})
        //setFilteredDataSource({});
        setSearch(text);
      }
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setDataState({...dataState, filteredDataSource: dataState.masterDataSource})
      //setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const renderCard = ({ item, index }) => (
    <ExerciseItem
      name={item.name}
      subtext={item.subtext}
      selected={item.selected}
      onPress={() => {
        const allExercises = { ...dataState.masterDataSource };
        if(isSortByMuscleGroup.current) {
          const { selected } = allExercises[item.muscleGroups][index];
          allExercises[item.muscleGroups][index].selected = !selected;
          if (allExercises[item.muscleGroups][index].selected === true) {
            setExerciseCount(exerciseCount + 1);
            addedExercises.push(item);
          } else {
            setExerciseCount(exerciseCount - 1);
            addedExercises.splice(addedExercises.indexOf(item), 1);
          }
        } else {
          const { selected } = allExercises[item.name[0]][index];
          allExercises[item.name[0]][index].selected = !selected;
          if (allExercises[item.name[0]][index].selected === true) {
            setExerciseCount(exerciseCount + 1);
            addedExercises.push(item);
          } else {
            setExerciseCount(exerciseCount - 1);
            addedExercises.splice(addedExercises.indexOf(item), 1);
          }
        }
        setDataState({...dataState, masterDataSource: allExercises})
        //setMasterDataSource(allExercises);
      }}
    />
  );
  return (
    <SafeAreaView style={{ height: '100%' }}>
      <Title>Exercises</Title>
      <ButtonContainer onPress={() => {
        onExercisesAdd(addedExercises);
        navigation.goBack();
      }}
      >
        <Buttontext>
          Add (
          {exerciseCount}
          )
          {' '}
        </Buttontext>
      </ButtonContainer>
      <View style={{ height: '92%'}}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={() => searchFilterFunction('')}
          value={search}
          platform="ios"
          containerStyle={{ backgroundColor: '#f2f2f2', width: '82%' }}
        />
        <SortByButton
          options={[
            {
              icon: 'ALPHABET', text: 'Sort By Name', onPress: () => { setDataState({...dataState,isSortByMuscleGroup: false}); toggleSort(); },
            },
            {
              icon: 'RUNNING', text: 'Sort By Muscle Group', onPress: () => { setDataState({...dataState, isSortByMuscleGroup: true}); toggleSort(); },
            }]}
            triggerSize = {28}
        />
        <AlphabetSectionList
          data={dataState.filteredDataSource}
          renderItem={renderCard}
          renderSectionHeader={renderHeader}
        />
      </View>
    </SafeAreaView>
  );
};

export default ExerciseList;
