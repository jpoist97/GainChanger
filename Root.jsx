import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarView from './components/Calendar/CalendarView';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Workouts from './components/Workouts/Workouts';
import Cycles from './components/Cycles/Cycles';
import { Entypo } from '@expo/vector-icons';
import { COLORS } from './constants';
import { useSelector } from 'react-redux';

export default ({navigation}) => {

  const Tab = createBottomTabNavigator();

  const colorTheme = useSelector((state) => state.settings.colorTheme);

    return (

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
          } else if (route.name === 'Cycles') {
            icon = <Entypo name="cycle" size={size} color={color} />;
          }
          return icon;
        },
      })}
      tabBarOptions={{
        activeTintColor: COLORS[colorTheme][1],
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Workouts" component={Workouts} />
      <Tab.Screen name="Cycles" component={Cycles} />
      <Tab.Screen name="Calendar" component={CalendarView} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
    )
}