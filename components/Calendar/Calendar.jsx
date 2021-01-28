import * as React from 'react';
import { View, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import styled from 'styled-components';
import firebase from 'firebase';
import CalendarWorkoutCard from './CalendarWorkoutCard';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];

const DayTitle = styled.Text`
  font-family: 'Montserrat_500Medium';
  font-size: 16px;
  text-align: left;
  margin-top: 25px;
`;

function formatDate(date) {
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate() + 1}`;
}

const CalendarView = () => {
  // 1. make field for completed workout dates in user
  // 2. update log workout, date should be sent to the date array in user
  // 3. update log workout to include isReps in the workoutRecords
  // 4. mark all dates on calendar with workouts
  // 5. implement redux so we don't have to make db calls every date click

  const startDate = new Date();
  const stateStart = `${days[startDate.getDay()]}, ${months[startDate.getMonth()]} ${startDate.getDate()}`;

  const [selectedDate, setselectedDate] = React.useState(stateStart);
  const [exercises, setExercises] = React.useState([]);
  const firstRun = React.useRef(true);
  const [markedDates, setMarkedDates] = React.useState();

  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser.uid;
  const userRef = db.collection('users').doc(currentUser);

  const getDateRecords = async (user, currentDate) => {
    const recordsRef = user.collection('workoutRecords');
    const workoutRecordSnapshot = await recordsRef.where('date', '==', currentDate).get();

    if (workoutRecordSnapshot.empty) {
      console.log(`No workout records for ${currentDate}`);
      return;
    }

    workoutRecordSnapshot.forEach((doc) => {
      const data = doc.data();
      const exerciseRecord = data.exercises;
      const { date } = data;

      exerciseRecord.forEach((record) => {
        const loggableData = {
          name: record.exerciseName,
          sets: record.sets,
          isReps: true,
          date,
        };
        setExercises([...exercises, loggableData]);
      });
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
          marks[date.dateString] = { selected: true, selectedColor: '#cab0ff' };
          setMarkedDates(marks);

          firstRun.current = false;
          const formattedDate = formatDate(new Date(date.dateString));
          if (selectedDate !== formattedDate) {
            setExercises([]);
            setselectedDate(formattedDate);
            getDateRecords(userRef, date.dateString);
          }
        }}
        enableSwipeMonths
      />
      <View style={{width:'90%', alignSelf:'center',height:2, backgroundColor:'#e5e5e5', marginTop:25}}/>
      <View style={{ justifyContent: 'flex-start', width: '100%', paddingLeft: 20 }}>
        {firstRun.current ? <DayTitle>No date selected</DayTitle> : <DayTitle>{selectedDate}</DayTitle>}
      </View>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.name + item.date}
        renderItem={(item) => (
          <CalendarWorkoutCard name={item.item.name} sets={item.item.sets} isReps={!!item.item.reps} />
        )}
      />
    </View>
  );
};

export default CalendarView;
