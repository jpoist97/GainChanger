import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly; 
  height: 30px; 
  width: 100%;
`;

const StyledText = styled.Text`
  font-family: 'Roboto_400Regular';
  color: #FFF;
  font-size: 16px;
  height: 25px;
  text-align: center;
`;

const LogHeader = ({ type }) => (
  <Container>
    <StyledText style={{ width: 30 }}>Set</StyledText>

    <StyledText style={{ width: 70 }}>Previous</StyledText>

    {type === 'WEIGHT' ? <StyledText style={{ width: 70 }}>lbs</StyledText> : <StyledText style={{ width: 70 }}>Sec</StyledText> }

    <StyledText style={{ width: 70 }}>Reps</StyledText>

    <StyledText style={{ width: 40 }}>Done</StyledText>
  </Container>
);

LogHeader.propTypes = {
  type: PropTypes.string,
};

LogHeader.defaultProps = {
  type: 'WEIGHT',
};

export default LogHeader;
