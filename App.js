import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RotationGestureHandler } from 'react-native-gesture-handler';
import Calendar from './components/calendar/Calendar';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import Workouts from './components/workouts/Workouts';
import Cycles from './components/cycles/Cycles';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import { AppLoading } from 'expo';
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
import firebase from 'firebase';
import login from './components/authentication/login'
import signup from './components/authentication/signup'



const Tab = createBottomTabNavigator();

const fontConfig = {
  default: {
    regular: {
      //Decide on main font
    },
    medium: {
      //Decdie on medium font
    },
    light: {
      //Decide on light font
    },

  },
};

const firebaseConfig = {
  apiKey: "AIzaSyAeNLJ0oGnsIZu_fCwqT5iby0QPMzjO_AY",
  authDomain: "gainchanger-fc6e1.firebaseapp.com",
  databaseURL: "https://gainchanger-fc6e1.firebaseio.com",
  projectId: "gainchanger-fc6e1",
  storageBucket: "gainchanger-fc6e1.appspot.com",
  messagingSenderId: "680655144263",
  appId: "1:680655144263:web:33752c8e87187691f6f862",
  measurementId: "G-47BCMB04L9"
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
  let [fontsLoaded] = useFonts({
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
  });
 
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase initiated successfully.")
  } else {
    console.log("Firebase setup already complete.")
  }

  const user = firebase.auth().currentUser;
  var startupScreen = 'login'

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        
      </NavigationContainer>
      </PaperProvider>
  );
}