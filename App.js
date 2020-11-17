import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { AppLoading } from 'expo';
import { MenuProvider } from 'react-native-popup-menu';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Montserrat_100Thin,
  Montserrat_100Thin_Italic,
  Montserrat_200ExtraLight,
  Montserrat_200ExtraLight_Italic,
  Montserrat_300Light,
  Montserrat_300Light_Italic,
  Montserrat_400Regular,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium,
  Montserrat_500Medium_Italic,
  Montserrat_600SemiBold,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold,
  Montserrat_800ExtraBold_Italic,
  Montserrat_900Black,
  Montserrat_900Black_Italic,
} from '@expo-google-fonts/montserrat';
import {
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto';
import firebase from 'firebase';
import { createStackNavigator } from '@react-navigation/stack';
import signup from './components/authentication/signup';
import Root from './Root';
import LogWorkout from './components/logWorkout/LogWorkout';
import login from './components/authentication/login';
import AddExercises from './components/exercises/AddExercises';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

const fontConfig = {
  default: {
    regular: {
      // Decide on main font
    },
    medium: {
      // Decdie on medium font
    },
    light: {
      // Decide on light font
    },

  },
};

const firebaseConfig = {
  apiKey: 'AIzaSyAeNLJ0oGnsIZu_fCwqT5iby0QPMzjO_AY',
  authDomain: 'gainchanger-fc6e1.firebaseapp.com',
  databaseURL: 'https://gainchanger-fc6e1.firebaseio.com',
  projectId: 'gainchanger-fc6e1',
  storageBucket: 'gainchanger-fc6e1.appspot.com',
  messagingSenderId: '680655144263',
  appId: '1:680655144263:web:33752c8e87187691f6f862',
  measurementId: 'G-47BCMB04L9',
};

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
  colors: {
    ...DefaultTheme.colors,
    primary: '#5DB075',
    accent: '#F6F6F6',
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light,
    Montserrat_300Light_Italic,
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold,
    Montserrat_800ExtraBold_Italic,
    Montserrat_900Black,
    Montserrat_900Black_Italic,
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase initiated successfully.');
  } else {
    console.log('Firebase setup already complete.');
  }

  const user = firebase.auth().currentUser;
  let startupScreen = 'Login';
  if (user) {
    startupScreen = 'Root';
  }

  const TabStackScreen = () => (
    <Stack.Navigator initialRouteName={startupScreen}>
      <Stack.Screen name="Login" component={login} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={signup} options={{ headerShown: false }} />
      <Stack.Screen name="Root" component={Root} options={{ headerShown: false }} />
    </Stack.Navigator>
  );

  return (
    <MenuProvider>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <RootStack.Navigator mode="modal" initialRouteName="Tab Stack Screen">
              {/* If you want to add any modal paths add them here */}
              <RootStack.Screen name = "Add Exercises" component = {AddExercises} options = {{headerShown: false }} />
              <RootStack.Screen name="Tab Stack Screen" component={TabStackScreen} options={{ headerShown: false }} />
              <RootStack.Screen name="Log Workout" component={LogWorkout} options={{ headerShown: false }} />
            </RootStack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </MenuProvider>
  );
}
