import React from 'react';
import {
  TouchableOpacity, View,
} from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

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

const CurrentCycle = (props) => {
  const {
    color, subtext,name, onPress,
  } = props;
    

  const StyledView = styled(TouchableOpacity)`
      background-color: ${color};
      width: 90%;
      height: 210px;
      border-radius: 20px;
      padding: 25px 25px 15px 25px;
      margin: 10px 10px 10px 20px;
      box-shadow: 3px 5px 2px #00000050;
   `;

  return (
    <View style={{ height: '100%' }}>
      <Title>Today</Title>
      <StyledView onPress={onPress}>
        <NameText>{name}</NameText>
        <Subtext>{subtext}</Subtext>
      </StyledView>
    </View>
  );
};

CurrentCycle.propTypes = {
  color: PropTypes.string,
  subtext: PropTypes.string,
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

CurrentCycle.defaultProps = {
  color: '#CAB0FF',
  subtext: '',
  onPress: () => {},
};

export default CurrentCycle;
