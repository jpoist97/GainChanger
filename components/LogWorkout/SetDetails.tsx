import React, { RefObject, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import styled from 'styled-components/native';

const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome);

const StyledText = styled(Text)`
   font-family: 'Roboto_400Regular';
   font-size: 16px;
   color: #fff;
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
   background-color: #ffffff;
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
   color: #fff;
   font-size: 16px;
`;

const CompleteButton = styled(TouchableOpacity)`
   background-color: #ffffff;
   border-radius: 5px;
   width: 25px;
   height: 25px;
`;

const PulloutButton = styled(TouchableOpacity)`
   justify-content: center;
   width: 25px;
   margin-right: 8px;
`;

const SetDetails = (props) => {
   const swipeRef = useRef<Swipeable>();

   const {
      completed,
      prevWeight,
      prevDuration,
      duration,
      setNumber,
      weight,
      onWeightChange,
      onDurationChange,
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
               swipeRef?.current?.close();
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
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            height: 50,
            width: '100%',
         }}
         renderRightActions={renderRight}
      >
         <SetNumber>
            <StyledText>{setNumber}</StyledText>
         </SetNumber>

         <PrevWeight>
            <StyledText>
               {prevWeight !== 'n/a' ? `${prevWeight} lbs.` : prevWeight}
            </StyledText>
         </PrevWeight>

         {completed ? (
            <CompletedText>{weight || prevWeight}</CompletedText>
         ) : (
            <StyledInput
               value={weight}
               placeholder={prevWeight}
               keyboardType="numeric"
               onChangeText={onWeightChange}
            />
         )}

         {completed ? (
            <CompletedText>{duration || prevDuration}</CompletedText>
         ) : (
            <StyledInput
               value={duration}
               placeholder={prevDuration}
               keyboardType="numeric"
               onChangeText={onDurationChange}
            />
         )}

         <View style={{ width: 40, alignItems: 'center' }}>
            <CompleteButton onPress={onCompletedPress}>
               {completed ? (
                  <Feather name="check" size={25} color="black" />
               ) : (
                  <View />
               )}
            </CompleteButton>
         </View>
      </Swipeable>
   );
};

SetDetails.propTypes = {
   completed: PropTypes.bool,
   prevWeight: PropTypes.string,
   prevDuration: PropTypes.string,
   weight: PropTypes.string,
   duration: PropTypes.string,
   setNumber: PropTypes.number.isRequired,
   onWeightChange: PropTypes.func.isRequired,
   onDurationChange: PropTypes.func.isRequired,
   onCompletedPress: PropTypes.func.isRequired,
   onSetDelete: PropTypes.func.isRequired,
};

SetDetails.defaultProps = {
   completed: false,
   prevWeight: 'n/a',
   prevDuration: 'n/a',
   weight: '',
   duration: '',
};

export default SetDetails;
