/* eslint-disable react/prop-types */
import { AntDesign } from '@expo/vector-icons';
import * as React from 'react';
import { View, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import FullCycleOrder from './FullCycleOrder';
import FinishButton from '../utils/FinishButton';
import PlusButton from '../utils/PlusButton';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_CYCLE } from '../../constants/index';


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
  const [workouts, setWorkouts] = React.useState([]);
  const dispatch = useDispatch();
  const allCycles = useSelector((state) => state.cycles.cycles);
  const nextCycleId = allCycles[allCycles.length - 1].id + 1;

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

      <AddFinishButton onPress={() => {
        if(!name) {
          alert('Please enter a cycle name');
        } 
        else if(workouts.length === 0) {
          alert('Please add at least one workout');
        } 
        else {
          const newCycle = {
            name,
            id: nextCycleId,
            color: workouts[0].color,
            workouts: workouts.map((workout) => workout.id),
          }
          dispatch({ type: ADD_CYCLE, cycle: newCycle });
          navigation.goBack();
        }
      }} />

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
