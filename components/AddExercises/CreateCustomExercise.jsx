import React, { useState } from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import RNPickerSelect from 'react-native-picker-select';
import actions from '../../actions/index';
import * as api from '../../api';
import { COLORS } from '../../constants/index';

const Name = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 16px;
  margin-left: 8px;
  margin-bottom: 10px;
  padding: 4px;
`;

const IconButton = styled(AntDesign)`
  position: absolute;
  right: 10px;
  top: 0px;
  height: 25px;
  width: 25px;
  margin: 0px 25px 0px 0px;
`;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly; 
  height: 50px; 
  width: 100%;
`;

const WorkoutNameInput = styled.TextInput`
  font-size: 14px;
  borderBottomWidth: 1px;
  width: 40%;
  padding: 6px;
`;

const SelectWrapper = styled.View`
  font-family: 'Montserrat_600SemiBold';
  font-size: 24px;
  borderBottomWidth: 1px;
  width: 40%;
  padding: 6px;
`;

const StyledButton = styled.TouchableOpacity`
  background-color: ${COLORS[props => props.color || 'default'][1]};
  height: 35px;
  width: 87%;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 4px;
  margin-bottom: 12px;
`;
const ButtonText = styled.Text`
  color: white;
  font-family: 'Montserrat_600SemiBold';
  font-size: 14px;
`;

const CreateCustomExercise = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [workoutName, setWorkoutName] = React.useState('');
  const [muscleGroup, setMuscleGroup] = React.useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const colorScheme = 'default';

  const createCustomExercise = async (exercise) => {
    const ExerciseDoc = await api.addCustomExercise(exercise);
    dispatch(actions.exercises.addCustomExercise({
      muscleGroups: muscleGroup,
      name: workoutName,
      id: ExerciseDoc.id,
    }));
    setIsExpanded(false);
    setMuscleGroup('');
    setWorkoutName('');
    navigation.navigate('Create Workout');
  };

  return (
    <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
      <Name>Create a Custom Exercise</Name>
      {isExpanded
        ? (
          <IconButton
            name="up"
            size={24}
            color={COLORS[colorScheme][0]}
          />
        )
        : (
          <IconButton
            name="down"
            size={24}
            color={COLORS[colorScheme][0]}
          />
        )}
      <Collapsible collapsed={!isExpanded}>
        <Container>
          <WorkoutNameInput
            onChangeText={(text) => setWorkoutName(text)}
            value={workoutName}
            placeholder="Workout Name"
          />

          <SelectWrapper>
            <RNPickerSelect
              onValueChange={(text) => setMuscleGroup(text)}
              placeholder={{
                label: 'Select a Muscle Group',
                value: null,
              }}
              value={muscleGroup}
              items={[
                { label: 'Back', value: 'Back' },
                { label: 'Biceps', value: 'Biceps' },
                { label: 'Calves', value: 'Calves' },
                { label: 'Cardio', value: 'Cardio' },
                { label: 'Chest', value: 'Chest' },
                { label: 'Core', value: 'Core' },
                { label: 'Forearms', value: 'Forearms' },
                { label: 'Full Body', value: 'Full Body' },
                { label: 'Legs', value: 'Legs' },
                { label: 'Olympic', value: 'Olympic' },
                { label: 'Shoulders', value: 'Shoulders' },
                { label: 'Triceps', value: 'Triceps' },
              ]}
            />
          </SelectWrapper>
        </Container>
        <StyledButton
          mode="contained"
          title="Create Workout"
          color={colorScheme}
          onPress={() => {
            if (!workoutName) {
              alert('Please enter a workout name');
            } else if (!muscleGroup) {
              alert('Please select a muscle group');
            } else {
              const exercise = {
                name: workoutName,
                muscleGroups: muscleGroup,
              };
              createCustomExercise(exercise, dispatch);
            }
          }}
        >
          <ButtonText>Create New Exercise</ButtonText>
        </StyledButton>
      </Collapsible>
    </TouchableOpacity>
  );
};

export default CreateCustomExercise;
