import React from 'react';
import { SafeAreaView, View, Alert } from 'react-native';
import styled from 'styled-components';
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';
import ExerciseChart from './ExerciseChart';
import ProfileStats from './ProfileStats';
import SettingsPopup from './SettingsPopup';

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

export default () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <TopRow>
        <Title>Profile</Title>
        <SettingsPopup
          triggerSize={25}
          options={[
            {
              text: 'Log Out',
              onPress: async () => {
                try {
                  await firebase.auth().signOut();
                  navigation.navigate('Login');
                } catch (err) {
                  Alert.alert('Could not be signed out', err);
                }
              },
            },
          ]}
        />
      </TopRow>
      <ProfileStats />
      <ExerciseChart />
    </SafeAreaView>
  );
};
