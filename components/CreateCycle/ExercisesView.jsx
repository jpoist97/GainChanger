import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import React from 'react';
import _ from 'lodash';

const ExercisesView = (props) => {
   const { exercises } = props;
   const WorkoutViewText = styled.Text`
      color: #ffffff;
      font-family: 'Montserrat_500Medium';
      font-size: 12px;
      paddingtop: 2px;
      padding-bottom: 4px;
      width: 33%;
      textalign: center;
   `;

   const RowHeader = styled.View`
      flex-direction: row;
      aligncontent: center;
      font-family: 'Montserrat_500Medium';
      justifycontent: space-evenly;
      width: 100%;
   `;

   const RowContent = styled.View`
      flex-direction: row;
      aligncontent: center;
      alignitems: center;
      justifycontent: space-evenly;
   `;

   const CycleTitle = styled.Text`
      color: #ffffff;
      font-size: 24px;
      font-family: 'Montserrat_500Medium';
      textalign: left;
      paddingleft: 15px;
      paddingtop: 5px;
   `;

   const SubTitle = styled(CycleTitle)`
      font-size: 16px;
      padding-bottom: 5px;
      font-family: 'Montserrat_600SemiBold';
   `;

   const storeExercises = useSelector((state) => state.exercises.exercises);

   const parseExercises = (exerciseList) =>
      exerciseList.map((exercise) => {
         const matchingExercise = _.find(
            storeExercises,
            (exerciseObj) => exercise.exerciseId === exerciseObj.id
         );

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
                  <WorkoutViewText style={{ marginLeft: 10 }}>
                     {item.name}
                  </WorkoutViewText>
                  <WorkoutViewText>{`${item.sets.length}x${
                     item.sets[0].reps || item.sets[0].time
                  }${item.sets[0].reps ? ' reps' : ' secs'}`}</WorkoutViewText>
                  <WorkoutViewText>{`${
                     item.sets[0].weight || 'N/A'
                  } lbs.`}</WorkoutViewText>
               </RowContent>
            )}
         />
      </View>
   );
};

export default ExercisesView;
