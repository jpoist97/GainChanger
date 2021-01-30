import * as React from 'react';
import { View, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import styled from 'styled-components';
import firebase from 'firebase';
import CalendarWorkoutCard from './CalendarWorkoutCard';
import { useDispatch, useSelector } from 'react-redux';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];

const DayTitle = styled.Text`
  font-family: 'Montserrat_500Medium';
  font-size: 16px;
  text-align: left;
  margin-top: 25px;
  margin-bottom: 15px;
`;

const NoWorkoutText = styled(DayTitle)`
  font-size: 24px;
`;

function formatDate(date) {
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate() + 1}`;
}

const CalendarView = () => {

  // 1. update log workout, should be numbers not strings
  // 2. add workout to redux store if it isn't in it already. check by the date
  // 3. on start up check the current day to load potential data
  // 4. don't unmark the marked dates

  const startDate = new Date();
  const stateStart = `${days[startDate.getDay()]}, ${months[startDate.getMonth()]} ${startDate.getDate()}`;
  const pastWorkoutDates = useSelector((state) => state.dates.dates);
  const workoutRecords = useSelector((state) => state.records.records);

  const [selectedDate, setselectedDate] = React.useState(stateStart);
  const [exercises, setExercises] = React.useState([]);
  const [markedDates, setMarkedDates] = React.useState(setDates(pastWorkoutDates));
  const [showWorkout, setShowWorkout] = React.useState(false);
  const firstRun = React.useRef(true);

  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser.uid;
  const userRef = db.collection('users').doc(currentUser);

  const dispatch = useDispatch();

  function setDates(dates){
    let marks = {};
    dates.forEach((date) => {
      marks[date] = { marked: true, selectedColor: '#cab0ff' };
    });
    return marks;
  }

  const filterRecords = (date, records) => {
    return records.filter((e) => {
      return e.date === date;
    });
  }

  const getDateRecords = async (user, currentDate) => {
    const recordsRef = user.collection('workoutRecords');
    //add here to check redux store
    const workoutRecordSnapshot = await recordsRef.where('date', '==', currentDate).get();

    if (workoutRecordSnapshot.empty) {
      setShowWorkout(false);
      return;
    }
    setShowWorkout(true);

    workoutRecordSnapshot.forEach((doc) => {
      const data = doc.data();
      const exerciseRecord = data.exercises;
      const { date } = data;

      const workoutSets = [];

      exerciseRecord.forEach((record) => {
        const loggableData = {
          name: record.exerciseName,
          sets: record.sets,
          isReps: true,
          date,
        };
        workoutSets.push(loggableData);
      });
      setExercises(workoutSets);
    });
  };

  return (
    <View style={{ justifyContent: 'center', height: '100%' }}>
      <Calendar
        style={{
          marginTop: 50,
        }}
        theme={{
          backgroundColor: '#f2f2f2',
          calendarBackground: '#f2f2f2',
          todayTextColor: '#cab0ff',
          dotColor: '#cab0ff',
          arrowColor: '#cab0ff',
          monthTextColor: 'black',
          textDayFontFamily: 'Montserrat_500Medium',
          textMonthFontFamily: 'Montserrat_600SemiBold',
          textDayHeaderFontFamily: 'Montserrat_500Medium',
          textDayFontSize: 14,
        }}
        markedDates={markedDates}
        onDayPress={(date) => {
          const marks = {};
          //TODO: make this not overwrite the marked: true property if it's true
          marks[date.dateString] = { selected: true, selectedColor: '#cab0ff' };
          setMarkedDates(marks);

          if (firstRun.current) {
            firstRun.current = false;
            // TODO: on first run, check today's date in the list of workout records
            // --> update redux/state with today's records if there are some
          }
          const formattedDate = formatDate(new Date(date.dateString));
          // const filteredRecords = filterRecords(date.dateString, workoutRecords);
          // if(filteredRecords[0]){
          //   setExercises(filteredRecords[0].exercises);
          // } 
          if (selectedDate !== formattedDate) {
            setExercises([]);
            setselectedDate(formattedDate);
            getDateRecords(userRef, date.dateString);
          }
        }}
        enableSwipeMonths
      />
      <View style={{
        width: '90%', alignSelf: 'center', height: 2, backgroundColor: '#e5e5e5', marginTop: 25,
      }}
      />
      <View style={{ justifyContent: 'flex-start', width: '100%', paddingLeft: 20 }}>
        {firstRun.current ? <DayTitle>No date selected</DayTitle> : <DayTitle>{selectedDate}</DayTitle>}
      </View>
      {showWorkout ? <FlatList
        data={exercises}
        keyExtractor={(item, index) => item.name + item.date + index.toString()}
        renderItem={(item) => {
          const isReps = 'reps' in item.item.sets[0];
          return (
            <CalendarWorkoutCard name={item.item.name} sets={item.item.sets} isReps={isReps} />
          );
        }}
      /> : <View style={{flex: 1, widht:'100%', alignItems:'center', justifyContent:'center'}}>
            <NoWorkoutText>No workout performed</NoWorkoutText>
          </View>}
    </View>
  );
};

export default CalendarView;
