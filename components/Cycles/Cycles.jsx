import * as React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';
import AlphabetCycleList from './AlphabetCycleList';
import PlusButton from '../utils/PlusButton';
import CreateCycle from '../CreateCycle/CreateCycle';

const AddCycleButton = styled(PlusButton)`
   position: absolute;
   bottom: 20px;
   right: 25px;
`;

export default () => {
   const navigation = useNavigation();
   const cycles = useSelector((state) => state.cycles);
   const workouts = useSelector((state) => state.workouts.workouts);
   const allCycles = cycles.cycles.map((cycle) => ({
      ...cycle,
      subtext: `${cycle.workouts.length} Workouts`,
      onPress: () => {
         const cID = cycle.id;
         const cycleDetails = cycle.workouts.map((workoutId) =>
            _.find(workouts, (workout) => workout.id === workoutId)
         );

         navigation.navigate('Create Cycle', {
            cycleName: cycle.name,
            cycleDetails,
            isNewCycle: false,
            cycleID: cID,
         });
      },
   }));
   const selectedCycle =
      cycles.selectedCycleId !== undefined &&
      _.find(allCycles, (cycle) => cycle.id === cycles.selectedCycleId);

   function Cycles() {
      return (
         <SafeAreaView style={{ height: '100%' }}>
            <AlphabetCycleList
               items={allCycles}
               selectedCycle={selectedCycle}
            />
            <AddCycleButton
               title="Cycle"
               size={18}
               onPress={() =>
                  navigation.navigate('Create Cycle', {
                     cycleName: '',
                     cycleDetails: [],
                     isNewCycle: true,
                  })
               }
            />
         </SafeAreaView>
      );
   }

   const Stack = createStackNavigator();
   return (
      // This allows you to access 2 different pages on same navigation tab. (i.e. Workouts)
      <SafeAreaView style={{ height: '100%' }}>
         <Stack.Navigator initialRouteName="Cycles">
            <Stack.Screen
               name="Cycles"
               component={Cycles}
               options={{ headerShown: false }}
            />
            <Stack.Screen
               name="Create Cycle"
               component={CreateCycle}
               options={{ headerShown: false }}
            />
         </Stack.Navigator>
      </SafeAreaView>
   );
};
