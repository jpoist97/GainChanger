import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
// import EllipsePopup from '../utils/EllipsisPopup';
import PlusButton from '../utils/PlusButton';
import { AntDesign } from '@expo/vector-icons';

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

const WorkoutCard = (props) => {
  const {
    color, subtext, name, onPress, selected, displayEllipses,
  } = props;

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
    <StyledView onPress = {onPress}>
      <NameText>{name}</NameText>
      {displayEllipses ? (
        <AddButton
          name = {selected ? "pluscircle" : "pluscircleo"}
          size = {28}
          color = "#CAB0FF"
       /> ) : <View />}
      <Subtext>{subtext}</Subtext>
    </StyledView>
  );
};

WorkoutCard.propTypes = {
  color: PropTypes.string,
  subtext: PropTypes.string,
  name: PropTypes.string.isRequired,
  displayEllipses: PropTypes.bool,
  selected: PropTypes.bool,
  onPress: PropTypes.func,

};

WorkoutCard.defaultProps = {
  color: '#CAB0FF',
  subtext: '',
  selected: false,
  displayEllipses: true,
  onPress: () => {},
};

export default WorkoutCard;
