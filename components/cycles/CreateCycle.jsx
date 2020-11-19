/* eslint-disable react/prop-types */
import { AntDesign } from '@expo/vector-icons';
import * as React from 'react';
import { View, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import FullCycleOrder from './FullCycleOrder';
import FinishButton from '../utils/FinishButton';
import PlusButton from '../utils/PlusButton';

const workoutsSampleData = [

];

const TitleTextInput = styled.TextInput`
  position: absolute;
  font-family: 'Montserrat_600SemiBold';
  font-size: 24px;
  margin: 15px 12%;
  width: 46%;
  borderBottomWidth: 1px;
  padding: 2px;
`;

const BackButton = styled.TouchableOpacity`
  font-size: 24px;
  margin: 17px 2%;
`;

const AddFinishButton = styled(FinishButton)`
  position: absolute;
  top: 15px;
  right: 20px;
`;

const AddCycleButton = styled(PlusButton)`
   position: absolute;
   bottom: 20px;
   right: 25px;
`;

export default ({ navigation }) => {
  const [name, setName] = React.useState('');
  const [workouts, setWorkouts] = React.useState(workoutsSampleData);

  const Stack = createStackNavigator();
  return (

    <SafeAreaView style={{ height: '100%' }}>

      <BackButton onPress={() => navigation.navigate('Cycles')}>
        <AntDesign name="left" size={30} color="black" />
      </BackButton>

      <TitleTextInput
        style={{ borderColor: name ? 'transparent' : 'black' }}
        onChangeText={(newName) => setName(newName)}
        value={name}
        placeholder="Cycle Name"
      />

      <AddFinishButton onPress={() => alert('Cycle Created')} />

      {/* TODO: remove this stack navigator */}
      <Stack.Navigator initialRouteName="CreateCycle">
        <Stack.Screen name="CreateCycle" component={CreateCycle} options={{ headerShown: false }} />
      </Stack.Navigator>

    </SafeAreaView>
  );

  function updateOrder(workoutList) {
    setWorkouts(workoutList);
  }

  function CreateCycle() {
    return (
      <SafeAreaView style={{ height: '100%' }}>
        <FullCycleOrder
          passWorkoutList={updateOrder}
          workouts={workouts}
        />
        <AddCycleButton
          title=" Add Workouts "
          size={18}
          onPress={() => navigation.navigate('Add Workouts', {
            onWorkoutsAdd: (selectedWorkouts) => {
              const newWorkouts = [...workouts];
              newWorkouts.push(...selectedWorkouts);
              setWorkouts(newWorkouts);
            },
          })}
        />
      </SafeAreaView>
    );
  }
};
