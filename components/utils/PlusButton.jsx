/* eslint-disable react/forbid-prop-types */
import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const ButtonContainer = styled(TouchableOpacity)`
   background-color: #E2E2E2;
   border-radius: 20px;
   padding: 10px;
`;

const PlusButton = (props) => {
  const {
    onPress, title, size, style,
  } = props;

  const Buttontext = styled.Text`
      font-family: 'Montserrat_500Medium';
      font-size: ${size}px;
   `;

  return (
    <ButtonContainer style={style} onPress={onPress}>
      <Text>
        <Buttontext>{title}</Buttontext>
        <Entypo name="plus" size={size} color="black" />
      </Text>
    </ButtonContainer>
  );
};

PlusButton.propTypes = {
  title: PropTypes.string,
  size: PropTypes.number,
  onPress: PropTypes.func,
  style: PropTypes.array,
};

PlusButton.defaultProps = {
  title: '',
  size: 18,
  onPress: () => alert('Unimplemented Plus Button'),
  style: [],
};

export default PlusButton;
