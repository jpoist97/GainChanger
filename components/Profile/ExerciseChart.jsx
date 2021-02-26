/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
  LineChart,
} from 'react-native-chart-kit';
import {
  Text, View, Dimensions, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { COLORS } from '../../constants/index';

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
  font-size: ${(props) => (props.longText ? 16 : 20)}px;
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

const SpinnerContainer = styled(View)`
  width: 100%;  
  display: flex;
  align-items: center;
  height: 400px;
  justify-content: center;
`;

const CenterText = styled(View)`
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 400px;
  padding: 30px;
`;

const StyledText = styled(Text)`
  font-family: 'Montserrat_500Medium';
  font-size: 16px;
  text-align: center;
`;

export default () => {
  const [exerciseState, setExerciseState] = useState({
    selectedExerciseId: '',
    selectedExerciseName: undefined,
  });

  const exerciseRecords = useSelector((state) => state.progress.exerciseRecords);
  const loading = useSelector((state) => state.progress.loading);
  const colorTheme = useSelector((state) => state.settings.colorTheme);
  const exerciseData = _.get(exerciseRecords, exerciseState.selectedExerciseId, []);

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
        <ExerciseName longText={exerciseState.selectedExerciseName && exerciseState.selectedExerciseName.length >= 20}>{exerciseState.selectedExerciseName || 'Select an Exercise'}</ExerciseName>
        <SelectExerciseButton>
          <Buttontext onPress={() => {
            navigation.navigate('Select Chart Exercise', { onExerciseSelect: setSelectedExercise, selectedExerciseId: exerciseState.selectedExerciseId });
          }}
          >
            Select Exercise
          </Buttontext>
        </SelectExerciseButton>
      </TwoColumnView>

      { loading
        ? (
          <SpinnerContainer>
            <ActivityIndicator color={COLORS[colorTheme][0]} size="large" />
          </SpinnerContainer>
        )
        : (exerciseData && exerciseData.length > 0 ? (
          <LineChart
          // TODO: Display a modal or popup when a datapoint is clicked
          // Might need to use renderDotContent to ake dots menu triggers
            onDataPointClick={(value) => { console.log(value); }}
            segments={5}
            data={{
              labels: exerciseData.map((exerciseInfo, index) => {
                if (index === 0 || index === exerciseData.length - 1) {
                  return exerciseInfo.date;
                }
                return '';
              }),
              datasets: [
                {
                  data: exerciseData.map((exerciseInfo) => exerciseInfo.weight),
                },
              ],
            }}
            width={Dimensions.get('window').width - 20}
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
        ) : (exerciseState.selectedExerciseName
          ? (
            <CenterText>
              <StyledText>
                No Data for
                {' '}
                {exerciseState.selectedExerciseName}
                .
              </StyledText>
              <StyledText>
                Start logging workouts with
                {' '}
                {exerciseState.selectedExerciseName}
                {' '}
                to see progress here!
              </StyledText>
            </CenterText>
          )
          : (
            <CenterText>
              <StyledText>Select an Exercise to see data!</StyledText>
            </CenterText>
          )))}

    </ExerciseChartContainer>
  );
};
