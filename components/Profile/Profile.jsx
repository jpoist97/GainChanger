import React from 'react';
import { SafeAreaView, View } from 'react-native';
import styled from 'styled-components';
import ExerciseChart from './ExerciseChart';
import ProfileStats from './ProfileStats';
import SettingsModal from './SettingsModal';

const Title = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 24px;
`;

const TopRow = styled(View)`
  width: 90%;
  margin: 15px 5%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default () => (
  <SafeAreaView>
    <TopRow>
      <Title>Profile</Title>
      <SettingsModal triggerSize={25} />
    </TopRow>
    <ProfileStats />
    <ExerciseChart />
  </SafeAreaView>
);
