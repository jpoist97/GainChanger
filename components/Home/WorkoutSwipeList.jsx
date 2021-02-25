import * as React from 'react';
import {
  FlatList, View, TouchableOpacity, Text,
} from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import SkinnyWorkoutCard from './SkinnyWorkoutCard';
import { COLORS } from '../../constants/index';
import { useSelector } from 'react-redux';

const Title = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 24px;
  margin: 0px 6%;
  paddingBottom: 15px
`;

const WorkoutSwipeList = (props) => {
  const { items } = props;
  const navigation = useNavigation();

  const colorTheme = useSelector((state) => state.settings.colorTheme);

  const renderCard = ({ item, index }) => (
    <SkinnyWorkoutCard
      name={item.name}
      subtext={item.subtext}
      onIconPress={item.onIconPress}
      onPress={() => navigation.navigate('Log Workout', { workoutId: item.id })}
      key={item.id}
      color={COLORS[colorTheme][index % (COLORS[colorTheme].length - 1)]}
    />
  );

  return (
    <View style={{ height: '100%' }}>
      <Title>Workouts</Title>
      <TouchableOpacity style={{ position: 'absolute', right: 15, top: 8 }} onPress={() => navigation.navigate('Workouts')}>
        <Text style={{ fontSize: 16, fontFamily: 'Montserrat_600SemiBold' }}>See All</Text>
      </TouchableOpacity>
      <FlatList
        horizontal
        data={items}
        renderItem={renderCard}
        keyExtractor={(item, index) => item.name + index}
      />
    </View>
  );
};

WorkoutSwipeList.propTypes = {
  items: PropTypes.array.isRequired,
};

export default WorkoutSwipeList;
