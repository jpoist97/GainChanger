/* eslint-disable no-use-before-define */
import React, {useRef} from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, Button
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import GestureRecognizer from 'react-native-swipe-gestures';
import PropTypes from 'prop-types';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { MaterialIcons } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

const AnimatedIcon = Animated.createAnimatedComponent(MaterialIcons);



const SetDetails = (props) => {
  const swipeRef = useRef();

  const {
    completed,
    prevWeight,
    reps,
    setNumber,
    weight,
    onWeightChange,
    onRepChange,
    onCompletedPress,
    onSetDelete,
  } = props;


  const renderRight = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-30, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
  
    return (
      <TouchableOpacity style={{
        alignItems: 'flex-end',
        backgroundColor: '#dd2c00',
        justifyContent: 'center',
        width: 30,
      }} onPress={() => {
        swipeRef.current.close();
        onSetDelete();
      }}>
        <AnimatedIcon 
          name='delete-forever'
          size={30}
          color='#FFF'
          style={{width: 30, transform: [{scale}]}}
          />
      </TouchableOpacity>
    );
  }


  return (
    <Swipeable 
    ref={swipeRef}
    friction={2}
    containerStyle={{width: '100%'}} 
    childrenContainerStyle={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly',height: 50, width: '100%', }}
    renderRightActions={renderRight}
    >

      <View style={completed ? { ...styles.setNumber, ...styles.noBackground } : styles.setNumber}>
        <Text>{setNumber}</Text>
      </View>

      <View style={styles.prevWeight}>
        {prevWeight ? (
          <Text>
            {prevWeight}
            {' '}
            lbs.
          </Text>
        ) : <View style={styles.noPrevWeight} />}
      </View>

      <View style={completed ? { ...styles.weight, ...styles.noBackground } : styles.weight}>
        <TextInput defaultValue={weight} keyboardType="numeric" onChangeText={onWeightChange} />
      </View>

      <View style={completed ? { ...styles.reps, ...styles.noBackground } : styles.reps}>
        <TextInput defaultValue={reps} keyboardType="numeric" onChangeText={onRepChange} />
      </View>

      <View>
        <TouchableOpacity
          style={completed
            ? { ...styles.completeButton, ...styles.completedCompleteButton }
            : styles.completeButton}
          onPress={onCompletedPress}
        >
          {completed ? <Feather name="check" size={24} color="white" /> : <Feather name="check" size={24} color="black" />}
        </TouchableOpacity>
      </View>
    </Swipeable>

  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: 50,
  },
  completed: {
    backgroundColor: '#5DB07580',
  },
  noBackground: {
    backgroundColor: '#00000000',
  },
  setNumber: {
    backgroundColor: '#c4c4c4',
    borderRadius: 5,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prevWeight: {
    height: 25,
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPrevWeight: {
    height: 25,
    width: 65,
    backgroundColor: '#c4c4c4',
    borderRadius: 5,
  },
  weight: {
    width: 50,
    height: 30,
    backgroundColor: '#c4c4c4',
    borderRadius: 5,
    padding: 5,
  },
  reps: {
    width: 50,
    height: 30,
    backgroundColor: '#c4c4c4',
    borderRadius: 5,
    paddingTop: 7,
    paddingLeft: 5,
  },
  completeButton: {
    backgroundColor: '#c4c4c4',
    borderRadius: 5,
    width: 30,
    height: 30,
    padding: 3,
  },
  completedCompleteButton: {
    backgroundColor: '#5DB075',
  },
});

SetDetails.propTypes = {
  completed: PropTypes.bool,
  prevWeight: PropTypes.number,
  weight: PropTypes.number,
  reps: PropTypes.number,
  setNumber: PropTypes.number.isRequired,
  onWeightChange: PropTypes.func.isRequired,
  onRepChange: PropTypes.func.isRequired,
  onCompletedPress: PropTypes.func.isRequired,
  onSetDelete: PropTypes.func.isRequired,
};

SetDetails.defaultProps = {
  completed: false,
  prevWeight: undefined,
  weight: '',
  reps: '',
};

export default SetDetails;
