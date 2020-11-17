/* eslint-disable react/prop-types */
import { AntDesign } from '@expo/vector-icons';
import * as React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import FullCycleOrder from './FullCycleOrder';
import FinishButton from '../utils/FinishButton';
import PlusButton from '../utils/PlusButton';

const workoutsSampleData = [
  {
    name: 'Push',
    lastPerformed: 4,
    id: 0,
    muscleGroups: 'Chest Triceps',
    color: '#CAB0FF',
    exercises: [
      { id: 'BENCH PRESS', sets: [{ weight: '150', reps: '8' }, { weight: '150', reps: '8' }, { weight: '150', reps: '8' }, { weight: '150', reps: '8' }] },
      { id: 'TRICEP DIPS', sets: [{ weight: '25', reps: '20' }, { weight: '25', reps: '20' }, { weight: '25', reps: '20' }, { weight: '25', reps: '20' }] },
      { id: 'SHOULDER PRESS', sets: [{ weight: '120', reps: '8' }, { weight: '120', reps: '8' }, { weight: '120', reps: '8' }, { weight: '120', reps: '8' }] },
    ],
  },
  {
    name: 'Pull',
    lastPerformed: 3,
    id: 1,
    muscleGroups: 'Back Biceps',
    color: '#9D8DFF',
    exercises: [
      { id: 'BARBELL ROWS', sets: [{ weight: '150', reps: '8' }, { weight: '150', reps: '8' }, { weight: '150', reps: '8' }, { weight: '150', reps: '8' }] },
      { id: 'BICEP CURLS', sets: [{ weight: '25', reps: '20' }, { weight: '25', reps: '20' }, { weight: '25', reps: '20' }, { weight: '25', reps: '20' }] },
      { id: 'SHOULDER SHRUGS', sets: [{ weight: '120', reps: '8' }, { weight: '120', reps: '8' }, { weight: '120', reps: '8' }, { weight: '120', reps: '8' }] },
    ],
  },
  {
    name: 'Legs',
    lastPerformed: 2,
    id: 2,
    muscleGroups: 'Quads Glutes',
    color: '#6D8DFF',
    exercises: [
      { id: 'SQUATS', sets: [{ weight: '150', reps: '8' }, { weight: '150', reps: '8' }, { weight: '150', reps: '8' }, { weight: '150', reps: '8' }] },
      { id: 'ROMANIAN DEADLIFTS', sets: [{ weight: '225', reps: '4' }, { weight: '225', reps: '4' }, { weight: '225', reps: '4' }, { weight: '225', reps: '4' }] },
      { id: 'CALF RAISES', sets: [{ weight: '120', reps: '8' }, { weight: '120', reps: '8' }, { weight: '120', reps: '8' }, { weight: '120', reps: '8' }] },
    ],
  },
  {
    name: 'Upper Body',
    lastPerformed: 1,
    id: 3,
    muscleGroups: 'Chest Shoulder',
    color: '#CAB0FF',
    exercises: [
      { id: 'BENCH PRESS', sets: [{ weight: '150', reps: '8' }, { weight: '150', reps: '8' }, { weight: '150', reps: '8' }, { weight: '150', reps: '8' }] },
      { id: 'SHOULDER PRESS', sets: [{ weight: '120', reps: '8' }, { weight: '120', reps: '8' }, { weight: '120', reps: '8' }, { weight: '120', reps: '8' }] },
      { id: 'BICEP CURLS', sets: [{ weight: '25', reps: '20' }, { weight: '25', reps: '20' }, { weight: '25', reps: '20' }, { weight: '25', reps: '20' }] },
      { id: 'TRICEP DIPS', sets: [{ weight: '25', reps: '20' }, { weight: '25', reps: '20' }, { weight: '25', reps: '20' }, { weight: '25', reps: '20' }] },
    ],
  },
  {
    name: 'Arms',
    lastPerformed: 7,
    id: 4,
    muscleGroups: 'Biceps Triceps',
    color: '#9D8DFF',
    exercises: [
      { id: 'BICEP CURLS', sets: [{ weight: '25', reps: '20' }, { weight: '25', reps: '20' }, { weight: '25', reps: '20' }, { weight: '25', reps: '20' }] },
      { id: 'TRICEP DIPS', sets: [{ weight: '25', reps: '20' }, { weight: '25', reps: '20' }, { weight: '25', reps: '20' }, { weight: '25', reps: '20' }] },
      { id: 'HAMMER CURLS', sets: [{ weight: '25', reps: '20' }, { weight: '25', reps: '20' }, { weight: '25', reps: '20' }, { weight: '25', reps: '20' }] },
      { id: 'SKULL CRUSHERS', sets: [{ weight: '25', reps: '20' }, { weight: '25', reps: '20' }, { weight: '25', reps: '20' }, { weight: '25', reps: '20' }] },
    ],
  },
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

  return (
    <View style={{ height: '100%' }}>
      <View>
        <BackButton onPress={() => navigation.navigate('Cycles')}>
          <AntDesign name="left" size={30} color="black" />
        </BackButton>
        <TitleTextInput
          style={{ borderColor: name ? 'transparent' : 'black' }}
          onChangeText={(newName) => setName(newName)}
          value={name}
          placeholder="Cycle Name"
        />

      </View>
      <AddFinishButton onPress={() => alert('Cycle Created')} />
      {/* Finish Button will take u back to Cycles and add cycle to list */}
      {/* This is where a list of workouts in the cycle will go. Should be
      able to drag to change order */}
      <FullCycleOrder workouts={workouts} />
      <AddCycleButton title="Workout" size={18} onPress={() => alert('Add Workout to Cycle')} />
    </View>
  );
};
