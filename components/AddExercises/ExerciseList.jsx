import * as React from 'react';
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

const ExerciseList = (props) => {
  const { onExercisesAdd, parsedItemsName, parsedItemsMuscleGroups } = props;
  const [isSortByMuscleGroup, setIsSortByMuscleGroup] = React.useState(false);
  const navigation = useNavigation();
  const [search, setSearch] = React.useState('');
  const [filteredDataSource, setFilteredDataSource] = React.useState(parsedItemsName);
  const [masterDataSource, setMasterDataSource] = React.useState(parsedItemsName);
  const [exerciseCount, setExerciseCount] = React.useState(0);
  const [addedExercises] = React.useState([]);

  function toggleSort() {
    console.log("-----------------")
    console.log(isSortByMuscleGroup)
    if(isSortByMuscleGroup) {
      console.log("code is setting muscle groups")
      setFilteredDataSource(parsedItemsMuscleGroups);
      setMasterDataSource(parsedItemsMuscleGroups);
    } else {
      setFilteredDataSource(parsedItemsName);
      setMasterDataSource(parsedItemsName);
    }
  }

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const firstLetter = text[0].toUpperCase();
      if (masterDataSource[firstLetter]) {
        const newData = masterDataSource[firstLetter].filter((item) => {
          const itemData = item.name
            ? item.name.toUpperCase()
            : '';
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        const filteredData = {};
        filteredData[firstLetter] = newData;
        setFilteredDataSource(filteredData);
        setSearch(text);
      } else {
        setFilteredDataSource({});
        setSearch(text);
      }
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };



  const renderCard = ({ item, index }) => (
    <ExerciseItem
      name={item.name}
      subtext={item.subtext}
      selected={item.selected}
      onPress={() => {
        const allExercises = { ...masterDataSource };
        // console.log(temp[item.muscleGroups][index]) !!! FOR MUSCLE GROUP ITEM ACCESS !!!
        if(isSortByMuscleGroup) {
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
        setMasterDataSource(allExercises);
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
              icon: 'ALPHABET', text: 'Sort By Name', onPress: () => { setIsSortByMuscleGroup(false); toggleSort(); },
            },
            {
              icon: 'RUNNING', text: 'Sort By Muscle Group', onPress: () => { setIsSortByMuscleGroup(true); toggleSort(); },
            }]}
            triggerSize = {28}
        />
        <AlphabetSectionList
          data={filteredDataSource}
          renderItem={renderCard}
          renderSectionHeader={renderHeader}
        />
      </View>
    </SafeAreaView>
  );
};

export default ExerciseList;
