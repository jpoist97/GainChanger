import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

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
   left: 10px;
   font-family: 'Montserrat_500Medium';
`;

const WorkoutContainer = (props) => {
  const {
    color, subtext, name, onPress,
  } = props;

  const StyledView = styled(TouchableOpacity)`
      background-color: ${color};
      width: 135px
      height: 165px;
      border-radius: 20px;
      padding: 15px 0px;
      padding-right: 15px;
      padding-left: 15px;
      margin: 10px
      marginLeft: 19px
      box-shadow: 3px 5px 2px #00000050;
   `;

  return (
    <StyledView onPress={onPress}>
      <NameText>{name}</NameText>
      <Subtext>
        {' '}
        {subtext}
        {' '}
      </Subtext>
    </StyledView>
  );
};

WorkoutContainer.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  subtext: PropTypes.string,
  onPress: PropTypes.func,
};

WorkoutContainer.defaultProps = {
  color: '#CAB0FF',
  subtext: '',
  onPress: () => {},
};

export default WorkoutContainer;
