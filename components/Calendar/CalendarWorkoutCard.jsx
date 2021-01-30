import * as React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
    margin-bottom: 5px;
`;

const SubHeader = styled(WorkoutTitle)`
    font-size: 16px;
    textAlign: center;
    flex: 1;
`;

const WorkoutViewText = styled(WorkoutTitle)`
    font-family: 'Montserrat_500Medium';
    font-size: 12px;
    textAlign: center;
    flex: 1;
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
    name, sets, isReps,
  } = props;

  const SetRow = (props) => {
    const {
      index, lbs, reps,
    } = props;

    return (
      <RowText>
        <WorkoutViewText>{index}</WorkoutViewText>
        <WorkoutViewText>{`${lbs} lbs`}</WorkoutViewText>
        <WorkoutViewText>{isReps ? reps : `${reps} secs`}</WorkoutViewText>
      </RowText>
    );
  };

  SetRow.propTypes = {
    index: PropTypes.number.isRequired,
    lbs: PropTypes.number,
    reps: PropTypes.number.isRequired,
  };

  SetRow.defaultProps = {
    lbs: 0,
  };

  return (
    <Container>
      <WorkoutTitle>{name}</WorkoutTitle>
      <RowText>
        <SubHeader>Set</SubHeader>
        <SubHeader>Weight</SubHeader>
        <SubHeader>{isReps ? 'Reps' : 'Time'}</SubHeader>
      </RowText>
      <FlatList
        data={sets}
        keyExtractor={(item, index) => item.exerciseID + index.toString()}
        renderItem={({ item, index }) => (
          <SetRow index={index + 1} lbs={item.weight} reps={item.reps} />
        )}
      />
    </Container>
  );
};

CalendarWorkoutCard.propTypes = {
  name: PropTypes.string,
  sets: PropTypes.array,
  isReps: PropTypes.bool,
};

CalendarWorkoutCard.defaultProps = {
  name: 'Workout_Name',
  sets: [],
  isReps: true,
};

export default CalendarWorkoutCard;
