/*
  TODO: Potentially merge this component with Workouts/WorkoutCard
  making height/width props of it to reuse here
*/
import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const NameText = styled.Text`
   color: #efefef;
   font-size: 24px;
   font-family: 'Montserrat_500Medium';
`;

const Subtext = styled.Text`
   color: #efefef;
   font-size: 16px;
   position: absolute;
   bottom: 15px;
   left: 10px;
   font-family: 'Montserrat_500Medium';
`;

const SkinnyWorkoutCard = (props) => {
   const { color, subtext, name, onPress } = props;

   const StyledView = styled(TouchableOpacity)`
      background-color: ${color};
      width: 135px;
      height: 165px;
      border-radius: 20px;
      padding: 15px 15px 15px 15px;
      margin: 10px 0px 0px 19px;
      box-shadow: 3px 5px 2px #00000050;
   `;

   return (
      <StyledView onPress={onPress}>
         <NameText numberOfLines={2}>{name}</NameText>
         <Subtext>{subtext}</Subtext>
      </StyledView>
   );
};

SkinnyWorkoutCard.propTypes = {
   color: PropTypes.string,
   name: PropTypes.string.isRequired,
   subtext: PropTypes.string,
   onPress: PropTypes.func,
};

SkinnyWorkoutCard.defaultProps = {
   color: '#CAB0FF',
   subtext: '',
   onPress: () => {},
};

export default SkinnyWorkoutCard;
