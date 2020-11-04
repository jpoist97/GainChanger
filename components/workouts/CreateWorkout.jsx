// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import FinishButton from '../utils/FinishButton';
import PlusButton from '../utils/PlusButton';

const TitleTextInput = styled.TextInput`
  font-family: 'Montserrat_600SemiBold';
  font-size: 24px;
  margin: 15px 3%;
  width: 67%;
  borderBottomWidth: 1px;
`;

const AddFinishButton = styled(FinishButton)`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const AddCycleButton = styled(PlusButton)`
   position: absolute;
   bottom: 20px;
   right: 25px;
`;

export default () => {
  const [name, setName] = React.useState('Set Workout Name');

  return (
    <View style={{ height: '100%' }}>
      <View>
        <TitleTextInput
          onChangeText={() => setName(name)}
          value={name}
          maxLength={40}
        />
        {/* Maybe make maxLength less, so workout name can't get cut off
      prevents them from having long names of workouts */}

      </View>
      <AddFinishButton onPress={() => alert('Workout Created')} />
      {/* This is where a list of set workout details components will go */}
      <AddCycleButton title="Exercise" size={18} onPress={() => alert('Add Exercies')} />
    </View>
  );
};
