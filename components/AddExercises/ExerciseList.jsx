import * as React from 'react';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import AlphabetSectionList from 'react-native-alphabet-sectionlist';
import { SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import ExerciseItem from './ExerciseItem';
import FilterPopup from '../utils/FilterPopup';

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

const FilterButton = styled(FilterPopup)`
  position: absolute;
  right: 15px;
  top: 22px;
  height: 35px;
  width: 35px;
  margin: 0px 15px 0px 0px;
`;

const parseItemsByName = (items) => {
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

const parseItemsByMuscleGroup = (items) => {
  // Sort by muscle group
  items.sort((a, b) => a.muscleGroups.localeCompare(b.muscleGroups));
  const bucketData = items.reduce((accumulator, item) => {
    const bucket = item.muscleGroups;
    if(!accumulator[bucket]) {
      accumulator[bucket] = [item]
    } else {
      accumulator[bucket].push(item);
    }
    return accumulator;
  }, {})

  // Sort by name within each muscle group
  for (let muscle in bucketData) {
    bucketData[muscle].sort((a, b) => a.name.localeCompare(b.name));
  }
  
  return bucketData;
};

const renderHeader = ({ section }) => (
  <SectionHeader>{section.title}</SectionHeader>
);

const ExerciseList = (props) => {
  const { items, onExercisesAdd } = props;

  const parsedItems = parseItemsByMuscleGroup(items);
  const [search, setSearch] = React.useState('');
  const [filteredDataSource, setFilteredDataSource] = React.useState(parsedItems);
  const [masterDataSource, setMasterDataSource] = React.useState(parsedItems);
  const [exerciseCount, setExerciseCount] = React.useState(0);
  const [addedExercises] = React.useState([]);
  const navigation = useNavigation();

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
        const temp = { ...masterDataSource };
        const { selected } = temp[item.name[0]][index];
        temp[item.name[0]][index].selected = !selected;
        setMasterDataSource(temp);
        if (temp[item.name[0]][index].selected === true) {
          setExerciseCount(exerciseCount + 1);
          addedExercises.push(item);
        } else {
          setExerciseCount(exerciseCount - 1);
          addedExercises.splice(addedExercises.indexOf(item), 1);
        }
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
        <FilterButton
          options={[
            {
              icon: 'ALPHABET', text: 'Sort By Name', onPress: () => { filterByName() },
            },
            {
              icon: 'RUNNING', text: 'Sort By Muscle Group', onPress: () => { filterByMuscleGroup() },
            }]}
            triggerSize = {28}
            masterDataSource = {masterDataSource}
            setMasterDataSource = {setMasterDataSource}

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
