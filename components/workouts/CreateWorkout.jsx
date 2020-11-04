/* eslint-disable react/prop-types, no-shadow */
import { AntDesign } from '@expo/vector-icons';
import * as React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import FinishButton from '../utils/FinishButton';
import PlusButton from '../utils/PlusButton';

const TitleTextInput = styled.TextInput`
  position: absolute;
  font-family: 'Montserrat_600SemiBold';
  font-size: 24px;
  margin: 15px 12%;
  width: 46%;
  borderBottomWidth: 1px;
  padding: 2px;
`;

const BackButton = styled.TouchableOpacity`
  font-size: 24px;
  margin: 17px 2%;
`;

const AddFinishButton = styled(FinishButton)`
  position: absolute;
  top: 15px;
  right: 20px;
`;

const AddCycleButton = styled(PlusButton)`
   position: absolute;
   bottom: 20px;
   right: 25px;
`;
export default ({ navigation }) => {
  const [name, setName] = React.useState('');

  return (
    <View style={{ height: '100%' }}>
      <View>
        <BackButton onPress={() => navigation.navigate('Workouts')}>
          <AntDesign name="left" size={30} color="black" />
        </BackButton>
        <TitleTextInput
          style={{ borderColor: name ? 'transparent' : 'black' }}
          onChangeText={(name) => setName(name)}
          value={name}
          placeholder="Workout Name"
        />

      </View>
      <AddFinishButton onPress={() => alert('Workout Created')} />
      {/* Finish Button will take u back to workouts and add workout to list */}
      {/* This is where a list of set workout details components will go */}
      <AddCycleButton title="Exercise" size={18} onPress={() => alert('Add Exercies')} />
    </View>
  );
};
