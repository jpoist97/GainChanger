import * as React from 'react';
import {
  View, Image, Alert,
  Dimensions,
} from 'react-native';
import { Button } from 'react-native-paper';
import firebase from 'firebase';
import 'firebase/firestore';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Title = styled.Text`
  font-family: 'Montserrat_700Bold';
  font-size: 40px;
  margin: 10px 6%;
`;

const SubTitle = styled.Text`
  font-family: 'Montserrat_700Bold';
  font-size: 30px;
  padding-top: 20px;
`;

const InputLine = styled.TextInput`
  width: 80%;
  background-color: #F6F6F6;
  border-width: 1px;
  border-color: #E8E8E8;
  border-radius: 12px;
  height: 50px;
  padding-left: 10px;
`;

const SignupText = styled.Text`
  color: white;
  font-family: 'Montserrat_600SemiBold';
  font-size: 16px;
`;

const SignupButton = styled.TouchableOpacity`
  background-color: #A192FF;
  height: 50px;
  width: 80%;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
`;

const DisabledSignupButton = styled(SignupButton)`
  opacity: .5;
`;

const ShowText = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  color: #A192FF;
  font-size: 16px;
  position: absolute;
  padding-right: 15px;
`;

const ErrorText = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  color: red;
  font-size: 12px;
`;

const ViewFiller = styled.View`
  height: 15px;
`;

const pushWorkout = {
  name: 'Push',
  muscleGroups: 'Chest Triceps Shoulders',
  lastPerformed: 'N/A',
  exercises: [
    {
      exerciseId: '6peaHJkFD27icchxAJzD', // Bench Press
      sets: [
        { reps: 12, weight: null },
        { reps: 12, weight: null },
        { reps: 12, weight: null },
      ],
    },
    {
      exerciseId: 'XzkLscitllVWr1sRrMAk', // Shoulder Press
      sets: [
        { reps: 10, weight: null },
        { reps: 10, weight: null },
        { reps: 10, weight: null },
        { reps: 8, weight: null },
      ],
    },
    {
      exerciseId: 'Tc6wqpA533v2umzEGLx6', // Push Ups
      sets: [
        { reps: 20, weight: null },
        { reps: 15, weight: null },
        { reps: 20, weight: null },
      ],
    },
    {
      exerciseId: 'fk3IABKT2FeCBgdAzl40', // Overhead Press
      sets: [
        { reps: 10, weight: null },
        { reps: 10, weight: null },
        { reps: 10, weight: null },
        { reps: 8, weight: null },
      ],
    },
  ],
};

const pullWorkout = {
  name: 'Pull',
  muscleGroups: 'Back Biceps',
  lastPerformed: 'N/A',
  exercises: [
    {
      exerciseId: 'qNBHPtkEW3PclBZ3j5GW', // Bent Over Row
      sets: [
        { reps: 10, weight: null },
        { reps: 10, weight: null },
        { reps: 10, weight: null },
      ],
    },
    {
      exerciseId: 'KsrS05QfDkBOCQhMQ0Te', // Pull Ups
      sets: [
        { reps: 10, weight: null },
        { reps: 10, weight: null },
        { reps: 10, weight: null },
      ],
    },
    {
      exerciseId: 'VVwdHYCl6Nec5pYCfibk', // Pullover
      sets: [
        { reps: 8, weight: null },
        { reps: 8, weight: null },
        { reps: 8, weight: null },
      ],
    },
    {
      exerciseId: '6zvctw4Ii0dHgBX1eQe6', // Incline Curl
      sets: [
        { time: 45, weight: null },
        { time: 60, weight: null },
        { time: 40, weight: null },
      ],
    },
  ],
};

const legsWorkout = {
  name: 'Legs',
  muscleGroups: 'Quads Calves',
  lastPerformed: 'N/A',
  exercises: [
    {
      exerciseId: 'OjxfnxDzbhQJ11ZAWx6D', // Jump Rope
      sets: [
        { time: 60, weight: null },
        { time: 120, weight: null },
        { time: 60, weight: null },
      ],
    },
    {
      exerciseId: 'mEphuc9OhKGE9uLJojWM', // Calf Raise
      sets: [
        { reps: 20, weight: null },
        { reps: 20, weight: null },
        { reps: 20, weight: null },
        { reps: 15, weight: null },
      ],
    },
    {
      exerciseId: 'dqQE9Pbzb7HJFDULu3fH', // Hip Adducter
      sets: [
        { reps: 15, weight: null },
        { reps: 15, weight: null },
        { reps: 15, weight: null },
        { reps: 15, weight: null },
      ],
    },
    {
      exerciseId: '31ROy02NIqplIBvXoaeB', // Squat
      sets: [
        { reps: 10, weight: null },
        { reps: 10, weight: null },
        { reps: 8, weight: null },
      ],
    },
  ],
};
const Signup = ({ navigation }) => {
  const [name, setName] = React.useState('');
  const [validName, setValidName] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [validEmail, setValidEmail] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [validPassword, setValidPassword] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(false);
  const isFirstRunName = React.useRef(true);
  const isFirstRunEmail = React.useRef(true);
  const isFirstRunPassword = React.useRef(true);
  const [disableButton, setDisableButton] = React.useState(false);

  const db = firebase.firestore();
  const imgDimension = Dimensions.get('window').width * 0.6;

  function ValidateEmail(mail) {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(mail)) {
      return (true);
    }
    return (false);
  }

  function clearFields() {
    setName('');
    setEmail('');
    setPassword('');
  }

  React.useEffect(() => {
    if (isFirstRunName.current) {
      isFirstRunName.current = false;
      return;
    }
    setValidName(!((name.length > 1)));
  }, [name]);

  React.useEffect(() => {
    if (isFirstRunEmail.current) {
      isFirstRunEmail.current = false;
      return;
    }
    setValidEmail(!ValidateEmail(email));
  }, [email]);

  React.useEffect(() => {
    if (isFirstRunPassword.current) {
      isFirstRunPassword.current = false;
      return;
    }
    setValidPassword(!(password.length > 5));
  }, [password]);

  const logCycleData = async (workoutIDs, userRef) => {
    const cycleData = {
      name: 'Push, Pull, Legs',
      workoutIds: workoutIDs,
    };

    const cyclesDataRef = userRef.collection('cycles').doc();

    const cycleSetData = cyclesDataRef.set(cycleData);
    const selectedCycleData = userRef.update({ selectedCycleId: cyclesDataRef.id });

    await Promise.all([cycleSetData, selectedCycleData]);
  };

  const logUserData = async (user) => {
    const userData = {
      email: user.email,
      name: user.displayName,
      selectedCycleId: '',
      selectedCycleIndex: 0,
      pastWorkoutDates: [],
      totalWorkoutsPerformed: 0,
      totalWeightLifted: 0,
      weightPersonalRecord: 0,
      settings: {
        enableRestNotifications: false,
        restNotificationTimer: 60,
        colorTheme: 'default',
      },
    };

    const userRef = db.collection('users').doc(user.uid);

    const userDataRef = userRef.set(userData);
    const workoutData1 = userRef.collection('workouts').doc();
    const workoutData2 = userRef.collection('workouts').doc();
    const workoutData3 = userRef.collection('workouts').doc();
    // eslint-disable-next-line
    await Promise.all([userDataRef, workoutData1.set(pushWorkout), workoutData2.set(pullWorkout), workoutData3.set(legsWorkout)]);
    logCycleData([workoutData1.id, workoutData2.id, workoutData3.id], userRef);
  };

  function signupPress() {
    if (name.length > 1) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          setDisableButton(true);
          user.user.updateProfile({
            displayName: name,
          }).then(() => {
            logUserData(user.user)
              .then(() => {
                setDisableButton(false);
                clearFields();
                navigation.navigate('LoadingScreen');
              })
              .catch((error) => {
                setDisableButton(false);
                console.log(error);
              });
          }).catch((error) => {
            setDisableButton(false);
            console.log('Display name not set.');
            console.log(error);
          });
        })
        .catch((error) => {
          setDisableButton(false);
          const errorMessage = error.message;
          Alert.alert('Error:', errorMessage);
        });
    } else {
      alert('Please enter your name.');
    }
  }

  function loginPress() {
    navigation.navigate('Login');
  }

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}
    >
      <Title>GainChanger</Title>
      <SubTitle>Signup</SubTitle>
      <Image
        style={{ width: imgDimension, height: imgDimension }}
        source={require('../../assets/logo.png')}
      />
      <InputLine
        placeholder="Name"
        selectionColor="#A192FF"
        textContentType="name"
        autoCorrect={false}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      {validName ? <View style={{ paddingLeft: 15, width: '80%', flexDirection: 'row' }}><ErrorText>Name must be longer than 1 character.</ErrorText></View> : <ViewFiller />}
      <InputLine
        autoCapitalize="none"
        placeholder="Email"
        selectionColor="#A192FF"
        textContentType="emailAddress"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      {validEmail ? <View style={{ paddingLeft: 15, width: '80%', flexDirection: 'row' }}><ErrorText>Invalid email.</ErrorText></View> : <ViewFiller />}
      <View style={{
        flexDirection: 'row', justifyContent: 'flex-end', width: '80%', alignItems: 'center',
      }}
      >
        <InputLine
          autoCapitalize="none"
          placeholder="Password"
          selectionColor="#A192FF"
          textContentType="password"
          secureTextEntry={hidePassword}
          value={password}
          style={{ width: '100%', marginBottom: 0 }}
          onChangeText={(text) => setPassword(text)}
        />
        <ShowText onPress={() => setHidePassword(!hidePassword)}>{hidePassword ? 'Show' : 'Hide'}</ShowText>
      </View>
      {validPassword ? <View style={{ paddingLeft: 15, width: '80%', flexDirection: 'row' }}><ErrorText>Password must be more than 6 characters.</ErrorText></View> : <ViewFiller />}
      {!disableButton
        ? (
          <SignupButton
            uppercase={false}
            mode="contained"
            onPress={signupPress}
          >
            <SignupText>Signup</SignupText>
          </SignupButton>
        )
        : (
          <DisabledSignupButton
            disabled={disableButton}
            uppercase={false}
            mode="contained"
            onPress={signupPress}
          >
            <SignupText>Signup</SignupText>
          </DisabledSignupButton>
        )}
      <Button
        uppercase={false}
        mode="text"
        color="#8643FF"
        onPress={loginPress}
      >
        Already have an account? Login
      </Button>
    </KeyboardAwareScrollView>
  );
};

Signup.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Signup;
