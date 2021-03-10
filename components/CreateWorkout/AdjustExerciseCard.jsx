import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { AntDesign } from '@expo/vector-icons';
import EllipsisPopup from '../utils/EllipsisPopup';

const NameText = styled.Text`
   color: #EFEFEF;
   font-size: 24px;
   font-family: 'Montserrat_500Medium';
`;

const StyledEllipsesPopup = styled(EllipsisPopup)`
   position: absolute;
   right: 10px;
   top: 18px;
   height: 25px;
   width: 25px;
`;

const StyledIcon = styled(AntDesign)`
   padding: 0px 10px;
`;

const ContentWrapper = styled.View`
  flexDirection: row;
`;
const StyledInput = styled.TextInput`
  width: 70px;
  height: 25px;
  background-color: #FFFFFF;
  border-radius: 5px;
  text-align: center;
  font-family: 'Roboto_400Regular';
  font-size: 16px;
`;

const StyledText = styled.Text`
  font-family: 'Roboto_400Regular';
  color: #FFF;
  font-size: 18px;
  height: 25px;
  text-align: center;
  padding: 2px 15px; 0px 0px;
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  width: 90%;
  height: 120px;
  border-radius: 20px;
  padding: 15px;
  margin: 10px 5%;
  box-shadow: 3px 5px 2px #00000050;
`;

const AdjustExerciseCard = (props) => {
  const {
    color, name, displayEllipses, sets, setSets, seconds, setSeconds, reps, setReps, removeExercise, isReps, toggleType, drag,
  } = props;

  return (
    <StyledTouchableOpacity onLongPress={drag} style={{ backgroundColor: color }}>

      <NameText>{name}</NameText>
      {displayEllipses ? (
        <StyledEllipsesPopup
          options={[
            {
              icon: 'SWAP', text: 'Switch Reps/Time', onPress: () => { toggleType(); },
            },
            {
              icon: 'DELETE', text: 'Remove Exercise', onPress: () => { removeExercise(); },
            }]}
        />
      ) : <View />}
      <ContentWrapper style={{ paddingTop: 3, paddingBottom: 3 }}>
        <StyledText style={{ marginLeft: '14%' }}>Sets</StyledText>
        { isReps
          ? <StyledText style={{ marginLeft: '30%' }}>Reps</StyledText>
          : <StyledText style={{ marginLeft: '26%' }}>Seconds</StyledText>}
      </ContentWrapper>
      <ContentWrapper>
        <StyledIcon
          name="minus"
          size={26}
          color="white"
          style={{ marginLeft: '0%' }}
          onPress={() => (sets ? parseInt(sets) <= 0 || setSets((parseInt(sets) - 1).toString()) : sets)}
        />
        <StyledInput value={sets} placeholder="3" keyboardType="numeric" onChangeText={setSets} />
        <StyledIcon
          name="plus"
          size={26}
          color="white"
          onPress={() => (sets ? setSets((parseInt(sets) + 1).toString()) : setSets('1'))}
        />
        {isReps ? (
          <ContentWrapper>
            <StyledIcon
              name="minus"
              size={26}
              color="white"
              style={{ marginLeft: '5%' }}
              onPress={() => (reps ? parseInt(reps) <= 0 || setReps((parseInt(reps) - 1).toString()) : reps)}
            />
            <StyledInput value={reps} type="number" placeholder="10" keyboardType="numeric" onChangeText={setReps} />
            <StyledIcon
              name="plus"
              size={26}
              color="white"
              onPress={() => (reps ? setReps((parseInt(reps) + 1).toString()) : setReps('1'))}
            />
          </ContentWrapper>
        ) : (
          <ContentWrapper>
            <StyledIcon
              name="minus"
              size={26}
              color="white"
              style={{ marginLeft: '5%' }}
              onPress={() => (seconds ? parseInt(seconds) < 5 || setSeconds((parseInt(seconds) - 5).toString()) : seconds)}
            />
            <StyledInput value={seconds} type="number" placeholder="60" keyboardType="numeric" onChangeText={setSeconds} />
            <StyledIcon
              name="plus"
              size={26}
              color="white"
              onPress={() => (seconds ? setSeconds((parseInt(seconds) + 5).toString()) : setSeconds('5'))}
            />
          </ContentWrapper>
        )}
      </ContentWrapper>
    </StyledTouchableOpacity>
  );
};

AdjustExerciseCard.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  displayEllipses: PropTypes.bool,
};

AdjustExerciseCard.defaultProps = {
  color: '#CAB0FF',
  displayEllipses: true,
};

export default AdjustExerciseCard;
