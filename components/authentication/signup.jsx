import * as React from 'react';
import {
  SafeAreaView, View, StyleSheet, Image, TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Button } from 'react-native-paper';
import firebase from 'firebase';
import styled from 'styled-components/native';

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

export default ({ navigation }) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(true);

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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Title>GainChanger</Title>
        <SubTitle>Sign Up</SubTitle>
        <Image
          style={styles.logo}
          source={require('../../assets/logo.png')}
        />
        <TextInput
          style={styles.input}
          selectionColor="#A192FF"
          placeholder="First name"
          value={name}
          onChangeText={(name) => setName(name)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          selectionColor="#A192FF"
          textContentType="emailAddress"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            selectionColor="#A192FF"
            textContentType="password"
            secureTextEntry={showPassword}
            value={password}
            onChangeText={(password) => setPassword(password)}
          />
          <Button
            style={styles.passwordShow}
            uppercase={false}
            mode="text"
            color="#8643FF"
            onPress={() => setShowPassword(!showPassword)}
          >
            Show
          </Button>
        </View>
        <Button
          style={styles.signup}
          contentStyle={styles.signupContent}
          uppercase={false}
          mode="contained"
          dark
          onPress={signupPress}
        >
          Sign Up
        </Button>
        <Button
          style={styles.login}
          uppercase={false}
          mode="text"
          color="#8643FF"
          onPress={loginPress}
        >
          Already have an account? Login
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '100%',
  },
  logo: {
    width: 225,
    height: 225,
    marginTop: 30,
    marginBottom: 30,
  },
  input: {
    alignSelf: 'center',
    width: '80%',
    backgroundColor: '#f6f6f6',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    marginBottom: 25,
    borderRadius: 7,
    padding: 10,
  },

  passwordContainer: {
    width: '100%',
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  passwordShow: {
    position: 'absolute',
    padding: 5,
    right: 35,
  },
  signup: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#A192FF',

  },
});
