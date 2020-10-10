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

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            // Returns the icon for each tab
            let icon;

            if (route.name === 'Home') {
              icon = <Ionicons name='ios-home' size={size} color={color} />;
            } else if (route.name === 'Workouts') {
              icon = <FontAwesome5 name="dumbbell" size={size} color={color} />;
            } else if (route.name === 'Calendar') {
              icon = <Ionicons name='ios-calendar' size={size} color={color} />;
            } else if (route.name === 'Profile') {
              icon = <FontAwesome5 name="user-circle" size={size} color={color} />;
            }

            return icon;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#5DB075',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Workouts" component={Workouts} />
        <Tab.Screen name="Calendar" component={Calendar} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}