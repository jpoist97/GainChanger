import React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components';
import ExerciseChart from './ExerciseChart';
import ProfileStats from './ProfileStats';

const Title = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 24px;
  margin: 15px 5%;
`;

export default () => (
  <SafeAreaView>
    <Title>Profile</Title>
    <ProfileStats />
    <ExerciseChart />
  </SafeAreaView>
);
