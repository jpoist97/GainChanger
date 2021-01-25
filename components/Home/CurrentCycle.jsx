import React from 'react';
import {
  TouchableOpacity, View,
} from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

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

const ArrowButton = styled(AntDesign)`
   height: 30px;
   width: 28px;
   color: #6D8DFF;
`;

const CurrentCycle = (props) => {
  const {
    color, subtext, name, leftPress, rightPress, id, isCycleSelected,
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
        <TouchableOpacity onPress={leftPress} disabled={!isCycleSelected}>
          <ArrowButton
            name="left"
            size={28}
            color="#CAB0FF"
          />
        </TouchableOpacity>
        <StyledView onPress={() => {
          if (isCycleSelected) {
            navigation.navigate('Log Workout', { workoutId: id });
          } else {
            navigation.navigate('Cycles');
          }
        }}
        >
          <NameText>{name}</NameText>
          <Subtext>{subtext}</Subtext>
        </StyledView>
        <TouchableOpacity onPress={rightPress} disabled={!isCycleSelected}>
          <ArrowButton
            name="right"
            size={28}
            color="#CAB0FF"
          />
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
  id: PropTypes.string,
  isCycleSelected: PropTypes.bool,
};

CurrentCycle.defaultProps = {
  color: '#CAB0FF',
  name: 'Set a cycle',
  subtext: '',
  id: undefined,
  leftPress: () => {},
  rightPress: () => {},
  isCycleSelected: false,
};

export default CurrentCycle;
