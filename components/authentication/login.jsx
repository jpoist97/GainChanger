import * as React from 'react';
import {
  View, StyleSheet, Image, TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Button } from 'react-native-paper';
import firebase from 'firebase';

export default ({ navigation }) => {
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
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Image
          style={styles.icon}
          source={require('../../assets/icon.png')}
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
            secureTextEntry={hidePassword}
            value={password}
            onChangeText={(password) => setPassword(password)}
          />
          <Button
            style={styles.passwordShow}
            uppercase={false}
            mode="text"
            color="#8643FF"
            onPress={() => setHidePassword(!hidePassword)}
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
          onPress={loginPress}
        >
          Login
        </Button>
        <Button
          style={styles.login}
          uppercase={false}
          mode="text"
          color="#8643FF"
          onPress={signupPress}
        >
          Don't have an account? Sign up
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
  icon: {
    width: 225,
    height: 225,
    marginTop: 50,
    marginBottom: 50,
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
