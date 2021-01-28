import * as React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import styled from 'styled-components';
import CalendarWorkoutCard from './CalendarWorkoutCard';
import { format } from 'date-fns';
import firebase from 'firebase';

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const months = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

const testSets = [
  {
      exerciseID: 'blabla1',
      lbs: 135,
      reps: 10,
  },
  {
      exerciseID: 'blabla2',
      lbs: 135,
      reps: 10,
  },
  {
      exerciseID: 'blabla3',
      lbs: 135,
      reps: 10,
  }
]

const DayTitle = styled.Text`
  font-family: 'Montserrat_500Medium';
  font-size: 16px;
  text-align: left;
`;

const getDateRecords = async (userRef, currentDate) => {
  //this function retrieves a workoutRecord by date
  const recordsRef = userRef.collection('workoutRecords');
  //currentDate is kind of a placeholder idk if it'll be able to match
  const workoutRecordSnapshot = await recordsRef.doc().where('date', '==', currentDate).get();

  if(workoutRecordSnapshot.empty){
    console.log("No workout records for " + currentDate);
    return;
  }
  
  workoutRecordSnapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });

  // re-format each matching document object to work with CalendarWorkoutCard
  // set exercises to list of those objects
}

function formatDate(date) { 
  return days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + (date.getDate() + 1);
}

// eslint-disable-next-line no-unused-vars
const CalendarView = () => {

  var startDate = new Date();
  const stateStart = days[startDate.getDay()] + ', ' + months[startDate.getMonth()] + ' ' + (startDate.getDate());

  const [selectedDate, setselectedDate] = React.useState(stateStart);
  const [exercises, setExercises] = React.useState([]);

  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser.uid;
  const userRef = db.collection('users').doc(currentUser);

  return (
  <View style={{justifyContent: 'center', height: '100%'}}>
    <Calendar
      // Specify style for calendar container element. Default = {}
      style={{
        marginTop: 50, 
      }}
      // Specify theme properties to override specific styles for calendar parts. Default = {}
      theme={{
        backgroundColor: '#f2f2f2',
        calendarBackground: '#f2f2f2',
        todayTextColor: '#cab0ff',
        dotColor: '#cab0ff',
        arrowColor: '#cab0ff',
        monthTextColor: '#cab0ff',
        textDayFontFamily: 'Montserrat_500Medium',
        textMonthFontFamily: 'Montserrat_600SemiBold',
        textDayHeaderFontFamily: 'Montserrat_500Medium',
        textDayFontSize: 14,
      }}
      markedDates={{
        '2021-01-15': {marked: true},
        '2021-01-16': {marked: true}
      }}
      onDayPress={(date) => { 
        var jsDate = new Date(date.dateString);
        setselectedDate(formatDate(jsDate));

        //date.datestring would be like 2021-01-28 so we need to store the dates in workoutRecords like that
        getDateRecords(userRef, date.dateString);
        
      }} //CHANGE TO SHOW RECORD COMPONENT
      enableSwipeMonths={true}
    />
    <View style={{justifyContent:'flex-start', width: '100%', paddingLeft: 20}}>
    <DayTitle>Workout on {selectedDate}</DayTitle>
    </View>
    <FlatList 
      data={exercises}
      renderItem={(item) => {
        return (
          <CalendarWorkoutCard name={item.name} sets={item.sets} isReps={item.reps ? true : false} />
        )
      }}
    />
  </View>
  )
};

export default CalendarView;