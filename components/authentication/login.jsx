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
  border-width: 1px;
  border-color: #E8E8E8;
  border-radius: 12px;
  height: 50px;
  padding-left: 10px;
  margin-bottom: 25px;
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: white;
  justify-content: center;
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

const ShowText = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  color: #A192FF;
  font-size: 16px;
  position: absolute;
  padding-right: 15px;
`;

const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [hidePassword, setHidePassword] = React.useState(true);

  function loginPress() {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMsg = error.message;
        switch (errorCode) {
          case 'auth/wrong-password':
            alert('Incorrect password.');
            break;

          default:
            alert(`Error: ${errorMsg}`);
        }
      });
  }

  function signupPress() {
    navigation.navigate('Signup');
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
        <SubTitle>Login</SubTitle>
        <Image
          style={{ width: 250, height: 250 }}
          /* eslint-disable global-require */
          source={require('../../assets/logo.png')}
          /* eslint-enable global-require */
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
        <LoginButton
          uppercase={false}
          mode="contained"
          dark
          onPress={loginPress}
        >
          <LoginText>Login</LoginText>
        </LoginButton>
        <Button
          uppercase={false}
          mode="text"
          color="#8643FF"
          onPress={signupPress}
        >
          Don&apos;t have an account? Sign up
        </Button>
      </Container>
    </KeyboardAvoidingView>
  );
};

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
