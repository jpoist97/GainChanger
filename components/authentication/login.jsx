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
  backgroundColor: #F6F6F6;
  borderWidth: 1;
  borderColor: #E8E8E8;
  borderRadius: 12;
  height: 50;
  paddingLeft: 10;
  marginBottom: 25;
`;

const Container = styled.View`
  flex: 1;
  alignItems: center;
  backgroundColor: white;
  justifyContent: center;
`;

const LoginText = styled.Text`
  color: white;
  font-family: 'Montserrat_600SemiBold';
  font-size: 16px;
`;

const LoginButton = styled.TouchableOpacity`
  backgroundColor: #A192FF;
  height: 50;
  width: 80%;
  borderRadius: 12;
  alignItems: center;
  justifyContent: center;
`;

const ShowText = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  color: #A192FF;
  font-size: 16px;
  position: absolute;
  paddingRight: 15px;
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
