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
          name: 'Back & Biceps', subtext: 'Back Biceps', color: '#CAB0FF', onPress: () => alert('Push, Pull, Legs A'), onIconPress: () => alert('Edit Push, Pull, Legs'),
        },
        {
          name: 'Upper A RP', subtext: 'Chest Triceps', color: '#9D8DFF', onPress: () => alert('Bro Split A'), onIconPress: () => alert('Edit Bro Split A'),
        },
        {
          name: 'Legs A', subtext: 'Quads Glutes', color: '#6D8DFF', onPress: () => alert('Upper Lower Split A'), onIconPress: () => alert('Edit Upper Lower Split'),
        },
        {
          name: 'Pull B', subtext: 'Back Biceps', color: '#CAB0FF', onPress: () => alert('Push, Pull, Legs B'), onIconPress: () => alert('Edit Push, Pull, Legs B'),
        },
        {
          name: 'Push B', subtext: 'Chest Triceps', color: '#9D8DFF', onPress: () => alert('Bro Split B'), onIconPress: () => alert('Edit Bro Split B'),
        },
        {
          name: 'Legs B', subtext: 'Quads Glutes', color: '#6D8DFF', onPress: () => alert('Upper Lower Split B'), onIconPress: () => alert('Edit Upper Lower Split B'),
        },
        {
          name: 'Pull B', subtext: 'Back Biceps', color: '#CAB0FF', onPress: () => alert('Push, Pull, Legs B'), onIconPress: () => alert('Edit Push, Pull, Legs B'),
        },
        {
          name: 'Push B', subtext: 'Chest Triceps', color: '#9D8DFF', onPress: () => alert('Bro Split B'), onIconPress: () => alert('Edit Bro Split B'),
        },
        {
          name: 'Legs B', subtext: 'Quads Glutes', color: '#6D8DFF', onPress: () => alert('Upper Lower Split B'), onIconPress: () => alert('Edit Upper Lower Split B'),
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
      // <View style={{ height: '100%' }}>
      //   <View>
      //     <BackButton onPress={() => navigation.navigate('Create Workout')}>
      //       <AntDesign name="left" size={30} color="black" />
      //     </BackButton>
      //   </View>
      //   <ExerciseList>items = {items}</ExerciseList>
      //   <AddFinishButton onPress={() => alert('Workout Created')} />
      // </View>
    );
  };

