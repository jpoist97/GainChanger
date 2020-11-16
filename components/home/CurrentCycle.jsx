import React from 'react';
import {
  TouchableOpacity, View,
} from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

const NameText = styled.Text`
   color: #EFEFEF;
   font-size: 32px;
   font-family: 'Montserrat_500Medium';
`;

const Title = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 24px;
  margin: 0px 6%;
  paddingBottom: 15px;
`;

const Subtext = styled.Text`
   color: #EFEFEF;
   font-size: 20px;
   position: absolute;
   bottom: 25px;
   left: 25px;
   font-family: 'Montserrat_500Medium';
`;
const Caret = styled.Text`
  color: #6D8DFF;
  font-size: 32px;
  font-family: 'Montserrat_600SemiBold';
`;

const CurrentCycle = (props) => {
  const {
    color, subtext, name, leftPress, rightPress, id,
  } = props;

  const navigation = useNavigation();

  const StyledView = styled(TouchableOpacity)`
      background-color: ${color};
      width: 85%;
      height: 210px;
      border-radius: 20px;
      padding: 25px 25px 15px 25px;
      margin: 10px 0px 0px 0px;
      box-shadow: 3px 5px 2px #00000050;
   `;

  return (
    <View style={{ height: '100%' }}>
      <Title>Today</Title>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
        <TouchableOpacity onPress={leftPress}>
          <Caret>
            {'<'}
          </Caret>
        </TouchableOpacity>
        <StyledView onPress={() => navigation.navigate('Log Workout', { workoutId: id })}>
          <NameText>{name}</NameText>
          <Subtext>{subtext}</Subtext>
        </StyledView>
        <TouchableOpacity onPress={rightPress}>
          <Caret>
            {'>'}
          </Caret>
        </TouchableOpacity>
      </View>
    </View>
  );
};

CurrentCycle.propTypes = {
  color: PropTypes.string,
  subtext: PropTypes.string,
  name: PropTypes.string,
  leftPress: PropTypes.func,
  rightPress: PropTypes.func,
  id: PropTypes.number,
};

CurrentCycle.defaultProps = {
  color: '#CAB0FF',
  name: 'Set a cycle',
  subtext: '',
  id: undefined,
  leftPress: () => {},
  rightPress: () => {},
};

export default CurrentCycle;
