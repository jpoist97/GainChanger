import React, { useState } from 'react';
import {
  LineChart,
} from 'react-native-chart-kit';
import {
  Text, View, Dimensions, TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { toDate, format } from 'date-fns';

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

export default () => {
  const [exerciseState, setExerciseState] = useState({
    selectedExerciseId: '',
    selectedExerciseName: 'Select an Exercise',
  });

  const exerciseRecords = useSelector((state) => state.progress.exerciseRecords);
  const loading = useSelector((state) => state.progress.loading);
  // If we get undefined for exerciseData, then don't show the damn graph
  const exerciseData = _.get(exerciseRecords, exerciseState.selectedExerciseId, []);
  console.log(exerciseData.map((exerciseInfo) => exerciseInfo.weight));

  // Get exerciseData from the store
  // const exerciseData = tempData;

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
            navigation.navigate('Select Chart Exercise', { onExerciseSelect: setSelectedExercise, selectedExerciseId: exerciseState.selectedExerciseId });
          }}
          >
            Select Exercise
          </Buttontext>
        </SelectExerciseButton>
      </TwoColumnView>

      {/* eslint-disable-next-line no-nested-ternary */}
      { loading ? <Text>Loading</Text> : (exerciseData && exerciseData.length > 0 ? (
        <LineChart
          onDataPointClick={(value) => { console.log(value); }}
          data={{
            labels: exerciseData.map((exerciseInfo, index) => {
              if (index === 0 || index === exerciseData.length - 1) {
                return format(toDate(exerciseInfo.date.seconds * 1000), 'MM-dd-yyyy');
              }
              return '';
            }),
            datasets: [
              {
                data: exerciseData.map((exerciseInfo) => exerciseInfo.weight),
              },
            ],
          }}
          width={Dimensions.get('window').width - 20} // from react-native
          height={400}
          yAxisSuffix=""
          fromZero
          chartConfig={{
            backgroundGradientFrom: '#1E2923',
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: '#08130D',
            backgroundGradientToOpacity: 0,
            fillShadowGradient: '#F8E3FC',
            fillShadowGradientOpacity: 0.8,
            color: () => 'rgba(133, 92, 248)',
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '4',
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      ) : <Text>No Data for said exercise</Text>)}

    </ExerciseChartContainer>
  );
};
