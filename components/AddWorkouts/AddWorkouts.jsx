/* eslint-disable react/forbid-prop-types */
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import AlphabetSectionList from 'react-native-alphabet-sectionlist';
import _ from 'lodash';
import { useNavigation } from '@react-navigation/core';
import SelectableWorkoutCard from './SelectableWorkoutCard';
import ModalScreenWrapper from '../utils/ModalScreenWrapper';
import { useSelector } from 'react-redux';

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

const ButtonContainer = styled(TouchableOpacity)`
    background-color: #E2E2E2;
    border-radius: 20px;
    padding: 5px;
    padding-left: 15px;
    padding-right: 15px;
    position: absolute;
    top: 80px;
    right: 20px;
 `;

const Buttontext = styled.Text`
   font-family: 'Montserrat_500Medium';
   font-size: 18px;
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

  // Pair up each bucket of data
  const pairedBucketData = _.mapValues(bucketData, (data) => {
    const pairData = [];

    // If we go "out of bounds" here it will just make right undefined
    for (let i = 0; i < data.length; i += 2) {
      pairData.push({ left: data[i], right: data[i + 1] });
    }
    return pairData;
  });

  return pairedBucketData;
};

const renderHeader = ({ section }) => (
  <SectionHeader>{section.title}</SectionHeader>
);

const AddWorkouts = (props) => {
  const navigation = useNavigation();

  const allWorkouts = useSelector((state) => state.workouts.workouts);
  const items = allWorkouts.map((workout) => ({ ...workout, subtext: workout.muscleGroups, selected: false }));

  const parsedItems = parseItems(items);
  
  const [workoutCount, setWorkoutCount] = React.useState(0);
  const [workoutsList, setWorkoutsList] = React.useState(parsedItems);
  const [addedWorkouts] = React.useState([]);

  const renderCard = ({ item: { left, right }, index }) => (
    <WorkoutCardPair>
      <SelectableWorkoutCard
        name={left.name}
        subtext={left.subtext}
        onPress={() => {
          const temp = { ...workoutsList };
          const { selected } = temp[left.name[0].toUpperCase()][index].left;
          temp[left.name[0].toUpperCase()][index].left.selected = !selected;
          setWorkoutsList(temp);

          (temp[left.name[0].toUpperCase()][index].left.selected === true) ? setWorkoutCount(workoutCount + 1)
            : setWorkoutCount(workoutCount - 1);
          (temp[left.name[0].toUpperCase()][index].left.selected === true) ? addedWorkouts.push(left)
            : addedWorkouts.splice(addedWorkouts.indexOf(left), 1);
        }}
        selected={left.selected}
        displayAddButton={left.displayAddButton}
        color={left.color}
        key={left.name + left.subtext}
      />

      {right ? (
        <SelectableWorkoutCard
          name={right.name}
          subtext={right.subtext}
          selected={right.selected}
          onPress={() => {
            const temp = { ...workoutsList };
            const { selected } = temp[right.name[0].toUpperCase()][index].right;
            temp[right.name[0].toUpperCase()][index].right.selected = !selected;
            setWorkoutsList(temp);
            (temp[right.name[0].toUpperCase()][index].right.selected === true) ? setWorkoutCount(workoutCount + 1)
              : setWorkoutCount(workoutCount - 1);
            (temp[right.name[0].toUpperCase()][index].right.selected === true) ? addedWorkouts.push(right)
              : addedWorkouts.splice(addedWorkouts.indexOf(right), 1);
          }}
          displayAddButton={right.displayAddButton}
          color={right.color}
          key={right.name + right.subtext}
        />
      ) : (
        <SelectableWorkoutCard
          color="#00000000"
          name=""
          displayAddButton={false}
        />
      )}
    </WorkoutCardPair>

  );

  return (
    <ModalScreenWrapper>
      <Title>Workouts</Title>
      <ButtonContainer onPress={() => {
        props.route.params.onWorkoutsAdd(addedWorkouts);
        navigation.goBack();
      }}
      >
        <Buttontext>
          Add (
          {addedWorkouts.length}
          )
        </Buttontext>
      </ButtonContainer>
      <AlphabetSectionList
        data={workoutsList}
        renderItem={renderCard}
        renderSectionHeader={renderHeader}
      />
    </ModalScreenWrapper>
  );
};

export default AddWorkouts;
