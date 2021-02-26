import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import React from 'react';
import _ from 'lodash';

const ExercisesView = (props) => {
  const { exercises } = props;
  const WorkoutViewText = styled.Text`
    color: #FFFFFF;
    font-family: 'Montserrat_500Medium';
    font-size: 12px;
    paddingTop: 2px;
    paddingBottom: 4px;
    width: 33%;
    textAlign: center;
  `;

  const RowHeader = styled.View`
    flexDirection: row;
    alignContent: center;
    font-family: 'Montserrat_500Medium';
    justifyContent: space-evenly;
    width:100%;
  `;

  const RowContent = styled.View`
    flexDirection: row;
    alignContent: center;
    alignItems: center;
    justifyContent: space-evenly;
  `;

  const CycleTitle = styled.Text`
   color: #FFFFFF;
   font-size: 24px;
   font-family: 'Montserrat_500Medium';
   textAlign: left;
   paddingLeft: 15px;
   paddingTop: 5px;
`;

  const SubTitle = styled(CycleTitle)`
    font-size: 16px;
    paddingBottom: 5px;
    font-family: 'Montserrat_600SemiBold';
`;

  const storeExercises = useSelector((state) => state.exercises.exercises);

  const parseExercises = () => exercises.map((exercise) => {
    const matchingExercise = _.find(storeExercises, (exerciseObj) => exercise.exerciseId === exerciseObj.id);

    return {
      ...exercise,
      name: matchingExercise.name,
    };
  });

  const parsedExercises = parseExercises(exercises);

  return (
    <View style={{ flexDirection: 'column', justifyContent: 'space-evenly' }}>
      <RowHeader>
        <SubTitle>Exercise</SubTitle>
        <SubTitle>Sets x Reps</SubTitle>
        <SubTitle>Previous</SubTitle>
      </RowHeader>
      <FlatList
        data={parsedExercises}
        keyExtractor={(item, index) => item.id + index.toString()}
        renderItem={({ item }) => (
          <RowContent>
            <WorkoutViewText style={{ marginLeft: 10 }}>{item.name}</WorkoutViewText>
            <WorkoutViewText>{`${item.sets.length}x${item.sets[0].reps || item.sets[0].time}`}</WorkoutViewText>
            <WorkoutViewText>{`${item.sets[0].weight} lbs.`}</WorkoutViewText>
          </RowContent>
        )}
      />
    </View>
  );
};

export default ExercisesView;
