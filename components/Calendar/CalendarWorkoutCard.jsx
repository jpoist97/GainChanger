import * as React from 'react';
import { View, Text} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import styled from 'styled-components';

const RowText = styled.View`
    flexDirection: row;
    alignContent: center;    
    alignItems: center;
    font-family: 'Montserrat_500Medium';
    justifyContent: space-evenly;
`;

const WorkoutTitle = styled.Text`
    font-family: 'Montserrat_500Medium';
    font-size: 24;
    color: #FFFFFF;
`;

const SubHeader = styled(WorkoutTitle)`
    font-size: 16;
`;

const WorkoutViewText = styled(WorkoutTitle)`
    font-family: 'Montserrat_500Medium';
    font-size: 12px;
    width: 25%;
    textAlign: center;
  `;

const Container = styled.View`
    flex-direction: column;
    justify-content: space-evenly;
    background-color: #CAB0FF;
    width: 90%;
    margin: auto;
    borderRadius: 10px;
    box-shadow: 1px 5px 2px gray;
    marginBottom: 10px;
    marginTop: 10px;
    padding: 10px;
`;

const CalendarWorkoutCard = (props) => {

    const {
        name, sets, isReps
    } = props;

    const SetRow = () => {
        return (
            <RowText>
                <WorkoutViewText>1</WorkoutViewText>
                <WorkoutViewText>135 lbs.</WorkoutViewText>
                <WorkoutViewText>135 lbs.</WorkoutViewText>
                <WorkoutViewText>10</WorkoutViewText>
            </RowText>
        )
    };

    return (
        <Container>
            <WorkoutTitle>{name}</WorkoutTitle>
            <RowText>
                <SubHeader>Set</SubHeader>
                <SubHeader>Previous</SubHeader>
                <SubHeader>lbs</SubHeader>
                <SubHeader>Reps</SubHeader>
            </RowText>
            <SetRow />
        </Container>
    )
};

export default CalendarWorkoutCard;