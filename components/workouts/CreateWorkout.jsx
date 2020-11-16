/* eslint-disable react/prop-types */
import { AntDesign } from '@expo/vector-icons';
import * as React from 'react';
import { Alert, View } from 'react-native';
import styled from 'styled-components/native';
import FinishButton from '../utils/FinishButton';
import PlusButton from '../utils/PlusButton';
import SetAllWorkoutDetails from '../setWorkoutDetails/SetAllWorkoutDetails';

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
  const items = [
    {
      name: 'Deadlifts', color: '#CAB0FF', onIconPress: () => alert('EllipsesPress'), reps: '', sets: '', seconds: '',
    },
    {
      name: 'Low Row', color: '#9D8DFF', onIconPress: () => alert('EllipsesPress'), reps: '', sets: '', seconds: ''
    },
    /*{
      name: 'Lat Pulldown', color: '#6D8DFF', onIconPress: () => alert('EllipsesPress'),
    },
    {
      name: 'Plank', color: '#CAB0FF', onIconPress: () => alert('EllipsesPress'),
    },
    {
      name: 'Bench Press', color: '#9D8DFF', onIconPress: () => alert('EllipsesPress'),
    },
    {
      name: 'Pull Ups', color: '#6D8DFF', onIconPress: () => alert('EllipsesPress'),
    }*/];
    const [itemState, setItemState] = React.useState(items);

    const setReps = (index) => (reps) => {
      const newItemState = [...itemState];
        newItemState[index].reps = reps;
        setItemState(newItemState);
    }

    const setSets=(index) => (sets) => {
      const newItemState = [...itemState];
        newItemState[index].sets = sets;
        setItemState(newItemState);
    }

    const setSeconds=(index) => (seconds) => {
      const newItemState = [...itemState];
        newItemState[index].seconds = seconds;
        setItemState(newItemState);
    }

    const onExercisesAdd = (selectedExercsies) => {
      const newItems = [...itemState];
      newitems.push(...selectedExercises)
      setItemState(newItems)
    }


  return (
    <View style={{ height: '100%' }}>
      <View>
        <BackButton onPress={() => navigation.navigate('Workouts')}>
          <AntDesign name="left" size={30} color="black" />
        </BackButton>
        <TitleTextInput
          style={{ borderColor: name ? 'transparent' : 'black' }}
          onChangeText={(newName) => setName(newName)}
          value={name}
          placeholder="Workout Name"
        />

      </View>
      <AddFinishButton onPress={() => (name ? navigation.navigate('Workouts') : Alert.alert('Oops', "Don't Forget to name your workout"))} />
      {/* TODO: Finish Button Needs to create new workout, and add it to Workout Page */}
      <SetAllWorkoutDetails items={itemState} setSets={setSets} setSeconds={setSeconds} setReps={setReps} />
      <AddCycleButton title="Exercise" size={18} onPress={() => { navigation.navigate('Add Exercises', {onExercisesAdd})}} />
    </View>
  );
};
