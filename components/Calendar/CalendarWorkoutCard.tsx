import * as React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// TODO: Remove this and update this component to use the common definition
// of an exercise
interface CalendarExercise {
   exerciseID: string;
   weight: string;
   reps?: number;
   time?: number;
}

const RowText = styled.View`
   width: 100%;
   flex-direction: row;
   align-content: center;
   align-items: center;
   font-family: 'Montserrat_500Medium';
   justify-content: space-evenly;
`;

const WorkoutTitle = styled.Text`
   font-family: 'Montserrat_500Medium';
   font-size: 24px;
   color: #ffffff;
   margin-bottom: 5px;
`;

const SubHeader = styled(WorkoutTitle)`
   font-size: 16px;
   text-align: center;
   flex: 1;
`;

const WorkoutViewText = styled(WorkoutTitle)`
   font-family: 'Montserrat_500Medium';
   font-size: 12px;
   text-align: center;
   flex: 1;
`;

const CalendarWorkoutCard = (props) => {
   const { name, sets, isReps, color } = props;

   const Container = styled.View`
      flex-direction: column;
      justify-content: flex-start;
      background-color: ${color};
      width: 90%;
      margin: auto;
      border-radius: 10px;
      box-shadow: 1px 5px 2px gray;
      margin-bottom: 10px;
      margin-top: 10px;
      padding: 10px;
   `;

   const SetRow = (props) => {
      //eslint-disable-line
      const { index, lbs, reps } = props;

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
      lbs: PropTypes.any,
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
         <FlatList<CalendarExercise>
            data={sets}
            keyExtractor={(item, index) => item.exerciseID + index.toString()}
            renderItem={({ item, index }) => (
               <SetRow
                  index={index + 1}
                  lbs={item.weight || 'N/A'}
                  reps={item.reps || item.time}
               />
            )}
         />
      </Container>
   );
};

CalendarWorkoutCard.propTypes = {
   name: PropTypes.string,
   sets: PropTypes.array,
   isReps: PropTypes.bool,
   color: PropTypes.string,
};

CalendarWorkoutCard.defaultProps = {
   name: 'Workout_Name',
   sets: [],
   isReps: true,
   color: '#CAB0FF',
};

export default CalendarWorkoutCard;
