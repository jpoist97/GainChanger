import React from 'react';
import {
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../constants';

const NameText = styled.Text`
   color: #EFEFEF;
   font-size: 24px;
   font-family: 'Montserrat_500Medium';
`;

const Subtext = styled.Text`
   color: #EFEFEF;
   font-size: 20px;
   position: absolute;
   bottom: 15px;
   left: 25px;
   font-family: 'Montserrat_500Medium';
`;

const AddButton = styled(AntDesign)`
   position: absolute;
   right: 14px;
   top: 18px;
   height: 30px;
   width: 28px;
   color: white;
`;

const SelectableWorkoutCard = (props) => {
  const {
    color, subtext, name, onPress, selected, displayAddButton,
  } = props;

  const colorScheme = 'default'; 

  const StyledView = styled(TouchableOpacity)`
      background-color: ${color};
      width: 40%;
      height: 180px;
      border-radius: 20px;
      padding: 15px 0px;
      padding-right: 50px;
      padding-left: 15px;
      margin: 10px 0px
      box-shadow: 3px 5px 2px #00000050;
   `;

  return (
    <StyledView onPress={onPress}>
      <NameText>{name}</NameText>
      {displayAddButton ? (
        <AddButton
          name={selected ? 'checkcircle' : 'checkcircleo'}
          size={28}
          color={COLORS[colorScheme][0]}
        />
      ) : <View />}
      <Subtext>{subtext}</Subtext>
    </StyledView>
  );
};

SelectableWorkoutCard.propTypes = {
  color: PropTypes.string,
  subtext: PropTypes.string,
  name: PropTypes.string.isRequired,
  displayAddButton: PropTypes.bool,
  selected: PropTypes.bool,
  onPress: PropTypes.func,

};

SelectableWorkoutCard.defaultProps = {
  color: '#CAB0FF',
  subtext: '',
  selected: false,
  displayAddButton: true,
  onPress: () => {},
};

export default SelectableWorkoutCard;
