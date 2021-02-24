import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { AppLoading } from 'expo';
import { MenuProvider } from 'react-native-popup-menu';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import {
  Roboto_400Regular,
} from '@expo-google-fonts/roboto';
import firebase from 'firebase';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './components/Authentication/signup';
import Root from './Root';
import LogWorkout from './components/LogWorkout/LogWorkout';
import Login from './components/Authentication/login';
import AddExercises from './components/AddExercises/AddExercises';
import AddWorkouts from './components/AddWorkouts/AddWorkouts';
import SelectChartExercise from './components/SelectChartExercise/SelectChartExercise';
import LoadingScreen from './components/Home/LoadingScreen';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldSetBadge: true,
    };
  },
});

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

const App = () => {
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Roboto_400Regular,
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

  let startupScreen = 'Login';

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      startupScreen = 'Root'
    }
  });

  const TabStackScreen = () => (
    <Stack.Navigator initialRouteName={startupScreen}>
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
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
              <RootStack.Screen name="Tab Stack Screen" component={TabStackScreen} options={{ headerShown: false }} />
              <RootStack.Screen name="Log Workout" component={LogWorkout} options={{ headerShown: false }} />
              <RootStack.Screen name = "Add Exercises" component = {AddExercises} options = {{headerShown: false }} />
              <RootStack.Screen name = "Add Workouts" component = {AddWorkouts} options = {{headerShown: false }} />
              <RootStack.Screen name = "Select Chart Exercise" component = {SelectChartExercise} options = {{headerShown: false }} />
            </RootStack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </MenuProvider>
  );
}

export default App;
