import React, { useState } from 'react';
import {
  LineChart,
} from 'react-native-chart-kit';
import {
  Text, View, Alert, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity,
} from 'react-native';
import { COLORS } from '../../constants/index';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';

const tempData = [
  {
    date: '2/1/21',
    exerciseId: 'CHEST press',
    reps: 10,
    weight: 100,
  },
  {
    date: '2/2/21',
    exerciseId: 'CHEST press',
    reps: 10,
    weight: 110,
  },
  {
    date: '2/3/21',
    exerciseId: 'CHEST press',
    reps: 10,
    weight: 120,
  },
  {
    date: '2/4/21',
    exerciseId: 'CHEST press',
    reps: 10,
    weight: 130,
  },
];

const ExerciseChartContainer = styled(View)`
  width: 100%;  
  display: flex;
  align-items: center;
`;

const TwoColumnView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  margin-bottom: 15px;
  align-items: center;
`;

const ExerciseName = styled(Text)`
  font-family: 'Montserrat_600SemiBold';
  font-size: 20px;
`;

const SelectExerciseButton = styled(TouchableOpacity)`
   background-color: #E2E2E2;
   border-radius: 20px;
   padding: 5px;
   padding-left: 15px;
   padding-right: 15px;
`;

const Buttontext = styled.Text`
  font-family: 'Montserrat_500Medium';
  font-size: 16px;
`;

export default (props) => {
  const [exerciseState, setExerciseState] = useState({
    selectedExerciseId: '',
    selectedExerciseName: 'Select an Exercise',
  });

  // Get exerciseData from the store
  const exerciseData = tempData;

  const navigation = useNavigation();

  const setSelectedExercise = (exerciseId, exerciseName) => {
    setExerciseState({
      selectedExerciseId: exerciseId,
      selectedExerciseName: exerciseName,
    });
  };

  return (
    <ExerciseChartContainer>
      <TwoColumnView>
        <ExerciseName>{exerciseState.selectedExerciseName}</ExerciseName>
        <SelectExerciseButton>
          <Buttontext onPress={() => {
            navigation.navigate('Select Chart Exercise', { onExerciseSelect: setSelectedExercise, selectedExerciseId: exerciseState.selectedExerciseId, })
          }}>
            Select Exercise
          </Buttontext>
        </SelectExerciseButton>
      </TwoColumnView>

      <LineChart
        onDataPointClick={(value) => { console.log(value); }}
        data={{
          labels: ['1/2/21', '', '', '', '2/6/21'],
          datasets: [
            {
              data: exerciseData.map((exerciseInfo) => exerciseInfo.weight),
            },
          ],
        }}
        width={Dimensions.get('window').width - 20} // from react-native
        height={400}
          // yAxisLabel="$"
        yAxisSuffix=""
        fromZero
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          //  backgroundColor: COLORS[1],
          // #855cf8
          backgroundGradientFrom: '#1E2923',
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: '#08130D',
          backgroundGradientToOpacity: 0,
          fillShadowGradient: '#F8E3FC',
          fillShadowGradientOpacity: 0.8,
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => 'rgba(133, 92, 248)',
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '4',
          },
        }}
        //   bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </ExerciseChartContainer>
  );
};
