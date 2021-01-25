import * as React from 'react';
import {
  View, Image, Alert,
} from 'react-native';
import { Button } from 'react-native-paper';
import firebase from 'firebase';
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

const LoginText = styled.Text`
  color: white;
  font-family: 'Montserrat_600SemiBold';
  font-size: 16px;
`;

const LoginButton = styled.TouchableOpacity`
  background-color: #A192FF;
  height: 50px;
  width: 80%;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
`;

const DisableLoginButton = styled(LoginButton)`
  opacity: .5;
`;

const ShowText = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  color: #A192FF;
  font-size: 16px;
  position: absolute;
  padding-right: 15px;
`;

const ViewFiller = styled.View`
  height: 15px;
`;

const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [hidePassword, setHidePassword] = React.useState(true);
  const [disableButton, setDisableButton] = React.useState(false);

  function ValidateEmail(mail) {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(mail)) {
      return (true);
    }
    return (false);
  }

  function clearFields () {
    setEmail('');
    setPassword('');
  }

  function loginPress() {
    setDisableButton(true);
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        setDisableButton(false);
        clearFields();
        navigation.navigate('Root');
      })
      .catch((error) => {
        setDisableButton(false);
        const errorMessage = error.message;
        Alert.alert('Error:', errorMessage);
      });
  }

  function signupPress() {
    navigation.navigate('Signup');
  }

  function forgotPassword() {
    if (ValidateEmail(email)) {
      firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          alert('Password reset link sent.');
        })
        .catch((error) => {
          alert('Password reset failed.');
          console.log(error);
        });
    } else {
      alert('Please input account email.');
    }
  }

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}
    >
      <Title>GainChanger</Title>
      <SubTitle>Login</SubTitle>
      <Image
        style={{ width: 250, height: 250 }}
        source={require('../../assets/logo.png')}
      />
      <InputLine
        placeholder="Email"
        selectionColor="#A192FF"
        textContentType="emailAddress"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <ViewFiller />
      <View style={{
        flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',
      }}
      >
        <InputLine
          placeholder="Password"
          selectionColor="#A192FF"
          textContentType="password"
          secureTextEntry={hidePassword}
          value={password}
          style={{ marginBottom: 0 }}
          onChangeText={(text) => setPassword(text)}
        />
        <ShowText onPress={() => setHidePassword(!hidePassword)}>Show</ShowText>
      </View>
      <View style={{ width: '80%', flexDirection: 'row' }}>
        <Button
          uppercase={false}
          mode="text"
          color="#8643FF"
          onPress={forgotPassword}
        >
          Forgot password?
        </Button>
      </View>
      <ViewFiller />
      {!disableButton
        ? (
          <LoginButton
            uppercase={false}
            mode="contained"
            onPress={loginPress}
          >
            <LoginText>Login</LoginText>
          </LoginButton>
        )
        : (
          <DisableLoginButton
            disabled={disableButton}
            uppercase={false}
            mode="contained"
            onPress={loginPress}
          >
            <LoginText>Login</LoginText>
          </DisableLoginButton>
        )}
      <Button
        uppercase={false}
        mode="text"
        color="#8643FF"
        onPress={signupPress}
      >
        Don&apos;t have an account? Sign up
      </Button>
    </KeyboardAwareScrollView>
  );
};

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
