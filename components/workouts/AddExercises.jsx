import * as React from 'react';
import {
  SafeAreaView, View,
} from 'react-native';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import FinishButton from '../utils/FinishButton';
import ExerciseList from './ExerciseList'



const BackButton = styled.TouchableOpacity`
  font-size: 24px;
  margin: 17px 2%;
`;

const AddFinishButton = styled(FinishButton)`
  position: absolute;
  top: 15px;
  right: 20px;
`;



export default ({ navigation }) => {  
    const items = [
        {
          name: 'Bicep Curls', subtext: 'Biceps',
        },
        {
          name: 'Barbell Curls', subtext: 'Biceps',
        },
        {
          name: 'Deadlifts', subtext: 'Back',
        },
        {
          name: 'Bench Press', subtext: 'Chest',
        },
        {
          name: 'Lateral Pulldowns', subtext: 'Back Biceps',
        },
        {
          name: 'Row Machine', subtext: 'Full Body',
        },
        {
          name: 'Pull Ups', subtext: 'Back',
        },
        {
          name: 'Low Rows', subtext: 'Back',
        },
        {
          name: 'Squats', subtext: 'Quads Glutes',
        }
    ];
    return (
      <SafeAreaView style = {{height: '100%'}}>
        <View>
           <BackButton onPress={() => navigation.navigate('Create Workout')}>
             <AntDesign name="left" size={30} color="black" />
           </BackButton>
         </View>
        <ExerciseList items={items} />
        <AddFinishButton onPress={() => alert('Workout Created')} />

      </SafeAreaView>
    );
  };

