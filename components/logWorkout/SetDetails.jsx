/* eslint-disable no-use-before-define */
import React, { useRef } from 'react';
import {
  View, Text, TouchableOpacity, Animated,
} from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import styled from 'styled-components/native';

const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome);

const StyledText = styled(Text)`
  font-family: 'Roboto_400Regular';
  font-size: 16px;
  color: #FFF;
`;

const SetNumber = styled.View`
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

const PrevWeight = styled.View`
  height: 25px;
  width: 70px;
  justify-content: center;
  align-items: center;
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

const CompletedText = styled.Text`
  padding-top: 4px;
  width: 70px;
  height: 25px;
  text-align: center;
  font-family: 'Roboto_400Regular';
  color: #FFF;
  font-size: 16px;
`;

const CompleteButton = styled(TouchableOpacity)`
  backgroundColor: #FFFFFF;
  borderRadius: 5px;
  width: 25px;
  height: 25px;
`;

const PulloutButton = styled(TouchableOpacity)`
  justify-content: center;
  width: 25px;
`;

const SetDetails = (props) => {
  const swipeRef = useRef();

  const {
    completed,
    prevPerRep,
    prevReps,
    reps,
    setNumber,
    perRep,
    onPerRepChange,
    onRepChange,
    onCompletedPress,
    onSetDelete,
  } = props;

  const renderRight = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-25, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <PulloutButton
        onPress={() => {
          swipeRef.current.close();
          onSetDelete();
        }}
      >
        <AnimatedIcon
          name="trash"
          size={25}
          color="#dd2c00"
          style={{ width: 30, transform: [{ scale }] }}
        />
      </PulloutButton>
    );
  };

  return (
    <Swipeable
      ref={swipeRef}
      friction={2}
      containerStyle={{ width: '100%' }}
      childrenContainerStyle={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', height: 50, width: '100%',
      }}
      renderRightActions={renderRight}
    >

      <SetNumber>
        <StyledText>{setNumber}</StyledText>
      </SetNumber>

      <PrevWeight>
        <StyledText>{prevPerRep !== 'n/a' ? `${prevPerRep} lbs.` : prevPerRep}</StyledText>
      </PrevWeight>

      {completed ? <CompletedText>{perRep || prevPerRep}</CompletedText> : <StyledInput value={perRep} placeholder={prevPerRep} keyboardType="numeric" onChangeText={onPerRepChange} />}

      {completed ? <CompletedText>{reps || prevReps}</CompletedText> : <StyledInput value={reps} placeholder={prevReps} keyboardType="numeric" onChangeText={onRepChange} />}

      <View style={{ width: 40, alignItems: 'center' }}>
        <CompleteButton onPress={onCompletedPress}>
          {completed ? <Feather name="check" size={25} color="black" /> : <View />}
        </CompleteButton>
      </View>

    </Swipeable>

  );
};

SetDetails.propTypes = {
  completed: PropTypes.bool,
  prevPerRep: PropTypes.string,
  prevReps: PropTypes.string,
  perRep: PropTypes.string,
  reps: PropTypes.string,
  setNumber: PropTypes.number.isRequired,
  onPerRepChange: PropTypes.func.isRequired,
  onRepChange: PropTypes.func.isRequired,
  onCompletedPress: PropTypes.func.isRequired,
  onSetDelete: PropTypes.func.isRequired,
};

SetDetails.defaultProps = {
  completed: false,
  prevPerRep: 'n/a',
  prevReps: 'n/a',
  perRep: '',
  reps: '',
};

export default SetDetails;
