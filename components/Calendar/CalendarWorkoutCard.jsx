import { string } from 'prop-types';
import * as React from 'react';
import { View, Text} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import styled from 'styled-components';

const RowText = styled.View`
    width: 100%;
    flexDirection: row;
    alignContent: center;    
    alignItems: center;
    font-family: 'Montserrat_500Medium';
    justifyContent: space-evenly;
`;

const WorkoutTitle = styled.Text`
    font-family: 'Montserrat_500Medium';
    font-size: 24px;
    color: #FFFFFF;
`;

const SubHeader = styled(WorkoutTitle)`
    font-size: 16px;
`;

const WorkoutViewText = styled(WorkoutTitle)`
    font-family: 'Montserrat_500Medium';
    font-size: 12px;
    width: 25%;
    textAlign: center;
  `;

const Container = styled.View`
    flex-direction: column;
    justify-content: flex-start;
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

    const SetRow = (props) => {

        const {
            index, previous, lbs, reps
        } = props;

        return (
            <RowText>
                <WorkoutViewText>{index}</WorkoutViewText>
                <WorkoutViewText>{previous}</WorkoutViewText>
                <WorkoutViewText>{lbs}</WorkoutViewText>
                <WorkoutViewText>{reps}</WorkoutViewText>
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
            <FlatList
                //sets prop should be the sets within each specific workout
                //can get the name by looking in 'exercises' for matching exerciseID and then grab the name
                data={sets}
                keyExtractor={(item) => item.exerciseID}
                renderItem={({item, index}) => {
                    return(
                        <SetRow index={index+1} previous={item.previous} lbs={item.lbs} reps={item.reps}/>
                    )
                }}
            />
        </Container>
    )
};

export default CalendarWorkoutCard;