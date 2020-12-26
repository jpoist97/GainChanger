import * as React from 'react';
import {
  View, Image, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Button } from 'react-native-paper';
import firebase from 'firebase';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

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
  border-width: 1;
  border-color: #E8E8E8;
  border-radius: 12;
  height: 50;
  padding-left: 10;
  margin-bottom: 25;
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: white;
  justify-content: center;
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

const Signup = ({ navigation }) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [hidePassword, setHidePassword] = React.useState(true);

  function signupPress() {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (errorCode) {
          case 'auth/weak-password':
            alert('Password too weak.');
            break;

          case 'auth/invalid-email':
            alert('Invalid email.');
            break;

          case 'auth/email-already-in-use':
            alert('That email is already being used.');
            break;

          default:
            alert(`Error: ${errorMessage}`);
        }
      });
  }

  function loginPress() {
    navigation.navigate('Login');
  }

  firebase.auth().onAuthStateChanged(() => {
    if (firebase.auth().currentUser) {
      navigation.navigate('Root');
    }
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <Container>
        <Title>GainChanger</Title>
        <SubTitle>Signup</SubTitle>
        <Image
          style={{ width: 250, height: 250 }}
          /* eslint-disable global-require */
          source={require('../../assets/logo.png')}
          /* eslint-enable global-require */
        />
        <InputLine
          placeholder="Name"
          selectionColor="#A192FF"
          textContentType="name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <InputLine
          placeholder="Email"
          selectionColor="#A192FF"
          textContentType="emailAddress"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <View style={{
          flexDirection: 'row', justifyContent: 'flex-end', width: '80%', alignItems: 'center', marginBottom: 25,
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
      </Container>
    </KeyboardAvoidingView>
  );
};

Signup.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Signup;
