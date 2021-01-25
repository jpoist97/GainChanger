import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const ButtonContainer = styled(TouchableOpacity)`
   background-color: #E2E2E2;
   border-radius: 20px;
   padding: 5px;
   padding-left: 15px;
   padding-right: 15px;
`;

const Buttontext = styled.Text`
  font-family: 'Montserrat_500Medium';
  font-size: 18px;
`;
const FinishButton = (props) => {
  const {
    onPress, style,
  } = props;

  return (
    <ButtonContainer style={style} onPress={onPress}>
      <Buttontext>Finish</Buttontext>
    </ButtonContainer>
  );
};
FinishButton.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.array,
};

FinishButton.defaultProps = {
  onPress: () => alert('Unimplemented Finish Button'),
  style: [],
};

export default FinishButton;
