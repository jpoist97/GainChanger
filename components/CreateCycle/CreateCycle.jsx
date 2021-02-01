import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import * as firebase from 'firebase';
import DraggableWorkoutList from './DraggableWorkoutList';
import FinishButton from '../utils/FinishButton';
import PlusButton from '../utils/PlusButton';
import actions from '../../actions/index';

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

export default ({ navigation, route }) => {
  const {
    cycleName, cycleDetails, isNewCycle, cycleID,
  } = route.params;
  const [name, setName] = React.useState(cycleName);
  const [workouts, setWorkouts] = React.useState(cycleDetails);
  const dispatch = useDispatch();

  const Stack = createStackNavigator();

  function updateOrder(workoutList) {
    setWorkouts(workoutList);
  }

  const createNewCycle = async (newCycle) => {
    const currentUser = firebase.auth().currentUser.uid;
    const cycleRef = firebase.firestore()
      .collection('users')
      .doc(currentUser)
      .collection('cycles');
    let cycleDoc;
    if (isNewCycle) {
      cycleDoc = await cycleRef.add(newCycle);
    } else {
      cycleDoc = await cycleRef.doc(cycleID).update(newCycle);
    }

    dispatch(actions.cycles.addCycle({
      workouts: newCycle.workoutIds,
      name: newCycle.name,
      id: cycleDoc.id,
    }));
  };

  function CreateCycle() {
    return (
      <SafeAreaView style={{ height: '100%' }}>
        <DraggableWorkoutList
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
        if (!name) {
          alert('Please enter a cycle name');
        } else if (workouts.length === 0) {
          alert('Please add at least one workout');
        } else {
          const newCycle = {
            name,
            workoutIds: workouts.map((workout) => workout.id),
          };
          createNewCycle(newCycle, dispatch);
          navigation.navigate('Cycles');
        }
      }}
      />

      {/* TODO: remove this stack navigator */}
      <Stack.Navigator initialRouteName="CreateCycle">
        <Stack.Screen name="CreateCycle" component={CreateCycle} options={{ headerShown: false }} />
      </Stack.Navigator>

    </SafeAreaView>
  );
};
