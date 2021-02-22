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
import SortByPopup from '../utils/SortByPopup';
import CreateCustomExercise from './CreateCustomExercise';

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

const ExerciseList = ({
  onExercisesAdd, parsedItemsName, parsedItemsMuscleGroups, exerciseObjects,
}) => {
  const [dataState, setDataState] = useState({ isSortByMuscleGroup: false, filteredDataSource: [], masterDataSource: parsedItemsName });
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [exerciseCount, setExerciseCount] = useState(0);
  const [addedExercises] = useState([]);

  const handleSortByNamePress = () => {
    setDataState({ isSortByMuscleGroup: false, filteredDataSource: parsedItemsName, masterDataSource: parsedItemsName });
  };

  const handleSortByMuscleGroupPress = () => {
    setDataState({ isSortByMuscleGroup: true, filteredDataSource: parsedItemsMuscleGroups, masterDataSource: parsedItemsMuscleGroups });
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

  const handleUnfilteredCardPress = (item, index) => {
    const allExercises = { ...dataState.masterDataSource };
    const selectedGroup = dataState.isSortByMuscleGroup ? item.muscleGroups : item.name[0];
    const { selected } = allExercises[selectedGroup][index];
    allExercises[selectedGroup][index].selected = !selected;
    if (allExercises[selectedGroup][index].selected === true) {
      setExerciseCount(exerciseCount + 1);
      addedExercises.push(item);
    } else {
      setExerciseCount(exerciseCount - 1);
      addedExercises.splice(addedExercises.indexOf(item), 1);
    }
    setDataState({ ...dataState, masterDataSource: allExercises });
  };

  const handleFilteredCardPress = (item, index) => {
    const filteredExercises = dataState.filteredDataSource;
    const { selected } = filteredExercises[index];
    filteredExercises[index].selected = !selected;
    if (filteredExercises[index].selected === true) {
      setExerciseCount(exerciseCount + 1);
      addedExercises.push(item);
    } else {
      setExerciseCount(exerciseCount - 1);
      addedExercises.splice(addedExercises.indexOf(item), 1);
    }
    setDataState({ ...dataState, filteredDataSource: filteredExercises });
  };

  const renderCard = ({ item, index }) => (
    <ExerciseItem
      name={item.name}
      subtext={item.subtext}
      selected={item.selected}
      onPress={() => (search ? handleFilteredCardPress(item, index) : handleUnfilteredCardPress(item, index))}
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
        </Buttontext>
      </ButtonContainer>
      <View style={{ height: '92%' }}>
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
              icon: 'ALPHABET', text: 'Sort By Name', onPress: handleSortByNamePress,
            },
            {
              icon: 'RUNNING', text: 'Sort By Muscle Group', onPress: handleSortByMuscleGroupPress,
            }]}
          triggerSize={28}
        />
        <CreateCustomExercise />
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
