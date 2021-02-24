import * as React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import AlphabetSectionList from 'react-native-alphabet-sectionlist';
import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import WorkoutCard from './WorkoutCard';
import actions from '../../actions/index';
import { COLORS } from '../../constants/index';

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
  // Sort names alphabetically
  items.sort((a, b) => a.name.localeCompare(b.name));

  // Group by first letter of each name
  const bucketData = items.reduce((accumulator, item, index) => {
    const bucket = item.name[0].toUpperCase();
    const newItem = {
      ...item,
      index,
    };

    // If this is the first time we've seen this letter, create a bucket
    if (!accumulator[bucket]) {
      accumulator[bucket] = [newItem];
    } else {
      accumulator[bucket].push(newItem);
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

const AlphabetWorkoutList = (props) => {
  const { items } = props;

  const navigation = useNavigation();
  const selectedCycle = useSelector((state) => state.cycles.selectedCycle);
  const allWorkouts = useSelector((state) => state.workouts.workouts);
  const dispatch = useDispatch();
  const parsedItems = parseItems(items);
  const colorScheme = 'default';

  const renderCard = ({ item: { left, right } }) => (
    <WorkoutCardPair>
      <WorkoutCard
        name={left.name}
        subtext={left.subtext}
        displayEllipses={left.displayEllipses}
        deleteWorkout={() => {
          if (selectedCycle.workouts.includes(left.id)) {
            alert('This workout is included in the selected cycle. Please select another cycle before deleting this workout.');
          } else {
            dispatch(actions.workouts.deleteWorkout(left.id));
          }
        }}
        editWorkout={() => {
          navigation.navigate('Edit Workout', { editWorkout: _.find(allWorkouts, (workout) => workout.id === left.id), editing: true });
        }}
        id={left.id}
        color={COLORS[colorScheme][left.index % (COLORS[colorScheme].length - 1)]}
        key={left.name + left.subtext}
        onPress={() => { navigation.navigate('Log Workout', { workoutId: left.id }); }}
      />
      {right ? (
        <WorkoutCard
          name={right.name}
          subtext={right.subtext}
          displayEllipses={right.displayEllipses}
          deleteWorkout={() => {
            if (selectedCycle.workouts.includes(right.id)) {
              alert('This workout is included in the selected cycle. Please select another cycle before deleting this workout.');
            } else {
              dispatch(actions.workouts.deleteWorkout(right.id));
            }
          }}
          editWorkout={() => {
            navigation.navigate('Edit Workout', { editWorkout: _.find(allWorkouts, (workout) => workout.id === right.id), editing: true });
          }}
          id={right.id}
          color={COLORS[colorScheme][right.index % (COLORS[colorScheme].length - 1)]}
          key={right.name + right.subtext}
          onPress={() => { navigation.navigate('Log Workout', { workoutId: right.id }); }}
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

AlphabetWorkoutList.propTypes = {
  items: PropTypes.array.isRequired,
};

export default AlphabetWorkoutList;
