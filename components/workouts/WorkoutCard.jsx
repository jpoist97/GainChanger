import React from 'react';
import {
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { FontAwesome5 } from '@expo/vector-icons';

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

const Ellipsis = styled(FontAwesome5)`
   position: absolute;
   right: 10px;
   top: 18px;
   height: 25px;
   width: 25px;
`;

const WorkoutCard = (props) => {
  const {
    color, subtext, name, onPress, onIconPress, displayEllipses,
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
    <StyledView onPress={onPress}>
      <NameText>{name}</NameText>
      {displayEllipses ? (
        <Ellipsis
          name="ellipsis-h"
          size={18}
          color="black"
          onPress={onIconPress}
        />
      ) : <View />}
      <Subtext>{subtext}</Subtext>
    </StyledView>
  );
};

WorkoutCard.propTypes = {
  color: PropTypes.string,
  subtext: PropTypes.string,
  name: PropTypes.string.isRequired,
  displayEllipses: PropTypes.bool,
  onPress: PropTypes.func,
  onIconPress: PropTypes.func,
};

WorkoutCard.defaultProps = {
  color: '#CAB0FF',
  subtext: '',
  displayEllipses: true,
  onPress: () => {},
  onIconPress: () => {},
};

export default WorkoutCard;
