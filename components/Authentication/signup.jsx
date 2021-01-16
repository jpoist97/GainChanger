import * as React from 'react';
import {
  View, Image, Alert,
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

const Signup = ({ navigation }) => {
  const [name, setName] = React.useState('');
  const [validName, setValidName] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [validEmail, setValidEmail] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [validPassword, setValidPassword] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(true);
  const isFirstRunName = React.useRef(true);
  const isFirstRunEmail = React.useRef(true);
  const isFirstRunPassword = React.useRef(true);

  const db = firebase.firestore();

  function ValidateEmail(mail) {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(mail)) {
      return (true);
    }
    return (false);
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

  function signupPress() {
    if (name.length > 1) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          user.user.updateProfile({
            displayName: name,
          }).then(() => {

            const userData = {
              email: user.user.email,
              name: user.user.displayName,
              selectedCycleId: '',
              selectedCycleIndex: 0,
            }

            const currentTime = firebase.firestore.FieldValue.serverTimestamp();

            const pushWorkout = {
              name: "Push",
              muscleGroups: "Chest Triceps Shoulders",
              lastPerformed: currentTime,
              exercises: [
                            {
                              exerciseID: "6peaHJkFD27icchxAJzD", 
                              sets: [
                                {reps: 12, weight: 135},
                                {reps: 12, weight: 135},
                                {reps: 12, weight: 135},
                              ]},
                            {
                              exerciseID: "5kSGnmeQOtKHZCX3Omka",
                              sets: [
                                {reps: 10, weight: 100},
                                {reps: 10, weight: 100},
                                {reps: 10, weight: 100},
                              ]
                            },
                            {
                              exerciseID: "C9QDiFEpKx0oZhqdLymp",
                              sets: [
                                {reps: 10, weight: 50},
                                {reps: 10, weight: 50},
                                {reps: 10, weight: 50},
                              ]
                            }
                          ]
            }

            const pullWorkout = {
              name: "Pull",
              muscleGroups: "Back Biceps",
              lastPerformed: currentTime,
              exercises: [
                            {
                              exerciseID: "6zvctw4Ii0dHgBX1eQe6", 
                              sets: [
                                {time: 10, weight: 60},
                                {time: 10, weight: 60},
                                {time: 10, weight: 60},
                              ]},
                            {
                              exerciseID: "An8hwIGvJrMMphdxubUs",
                              sets: [
                                {reps: 10, weight: 100},
                                {reps: 10, weight: 100},
                                {reps: 10, weight: 100},
                              ]
                            },
                            {
                              exerciseID: "X9HKNuWTf5zTHqpobfxS",
                              sets: [
                                {reps: 12, weight: 100},
                                {reps: 12, weight: 100},
                                {reps: 12, weight: 100},
                              ]
                            }
                          ]
            }

            const legsWorkout = {
              name: "Legs",
              muscleGroups: "Quads Glutes",
              lastPerformed: currentTime,
              exercises: [
                            {
                              exerciseID: "31ROy02NIqplIBvXoaeB", 
                              sets: [
                                {time: 10, weight: 135},
                                {time: 10, weight: 135},
                                {time: 10, weight: 135},
                              ]},
                            {
                              exerciseID: "2TvJvGO8CuxXzxk1D2Si",
                              sets: [
                                {reps: 10, weight: 100},
                                {reps: 10, weight: 100},
                                {reps: 10, weight: 100},
                              ]
                            },
                            {
                              exerciseID: "XzkLscitllVWr1sRrMAk",
                              sets: [
                                {reps: 10, weight: 100},
                                {reps: 10, weight: 100},
                                {reps: 10, weight: 100},
                              ]
                            }
                          ]
            }

            //set initial user 
            const userRef = db.collection('users').doc(user.user.uid);
            
            const userDataRef = userRef.set(userData);
            const userWorkout1 = userRef.collection('workouts').doc();
            const userWorkout2 = userRef.collection('workouts').doc();
            const userWorkout3 = userRef.collection('workouts').doc();


            Promise.all(
              userDataRef,
              userWorkout1.set(pushWorkout), 
              userWorkout2.set(pullWorkout),
              userWorkout3.set(legsWorkout)
            ).then(() => {
              console.log("workouts and user set successfully.");
            });

            const cycleData = {
              name: 'Push, Pull, Legs',
              workoutIDs: [userWorkout1.id, userWorkout2.id, userWorkout3.id],
            }

            const cyclesDataRef = userRef.collection('cycles').doc();
            
            cyclesDataRef.set(cycleData)
              .then(() => {
                console.log("cycles set successfully.");
            });

            userRef.update({selectedCycleId: cyclesDataRef.id})
              .then(() => {
                console.log("selected cycle updated.");
            });
            
            navigation.navigate('Root');
          }).catch((error) => {
            console.log('Display name not set.');
            console.log(error);
          });
        })
        .catch((error) => {
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
        style={{ width: 250, height: 250 }}
          /* eslint-disable global-require */
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
          placeholder="Password"
          selectionColor="#A192FF"
          textContentType="password"
          secureTextEntry={hidePassword}
          value={password}
          style={{ width: '100%', marginBottom: 0 }}
          onChangeText={(text) => setPassword(text)}
        />
        <ShowText onPress={() => setHidePassword(!hidePassword)}>Show</ShowText>
      </View>
      {validPassword ? <View style={{ paddingLeft: 15, width: '80%', flexDirection: 'row' }}><ErrorText>Password must be more than 6 characters.</ErrorText></View> : <ViewFiller />}
      <SignupButton
        uppercase={false}
        mode="contained"
        dark
        onPress={signupPress}
      >
        <SignupText>Signup</SignupText>
      </SignupButton>
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
