import * as React from 'react';
import { View, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import styled from 'styled-components';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import CalendarWorkoutCard from './CalendarWorkoutCard';
import actions from '../../actions';
import { DAYS, MONTHS, COLORS } from '../../constants/index';

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
  return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate() + 1}`;
}

const CalendarView = () => {
  const startDate = new Date();
  const stateStart = `${DAYS[startDate.getDay()]}, ${MONTHS[startDate.getMonth()]} ${startDate.getDate()}`;
  const pastWorkoutDates = useSelector((state) => state.dates.dates);
  const workoutRecords = useSelector((state) => state.records.records);
  const colorTheme = useSelector((state) => state.settings.colorTheme);

  const [selectedDate, setselectedDate] = React.useState(stateStart);
  const [exercises, setExercises] = React.useState([]);
  const [markedDates, setMarkedDates] = React.useState({});
  const [showWorkout, setShowWorkout] = React.useState(false);
  const firstRun = React.useRef(true);

  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser.uid;
  const userRef = db.collection('users').doc(currentUser);

  const dispatch = useDispatch();

  const filterRecords = (date, records) => records.filter((e) => e.date === date);

  React.useEffect(() => {
    setMarkedDates(createCalendarMarkedDates(pastWorkoutDates));
  }, [colorTheme]);

  const createCalendarMarkedDates = (dates) => {
    const marks = {};
    dates.forEach((date) => {
      marks[date] = { marked: true, selectedColor: COLORS[colorTheme][0] };
    });
    return marks;
  }

  const getDateRecords = async (user, currentDate) => {
    const recordCheck = filterRecords(currentDate, workoutRecords);
    if (recordCheck.length > 0) {
      console.log('Record found in redux.');
      setShowWorkout(true);
      setExercises(recordCheck);
    } else {
      const recordsRef = user.collection('workoutRecords');
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
            date,
          };
          workoutSets.push(loggableData);
          dispatch(actions.records.addWorkoutRecord(loggableData));
        });
        setExercises(workoutSets);
      });
    }
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
          todayTextColor: COLORS[colorTheme][0],
          dotColor: COLORS[colorTheme][0],
          arrowColor: COLORS[colorTheme][0],
          monthTextColor: 'black',
          textDayFontFamily: 'Montserrat_500Medium',
          textMonthFontFamily: 'Montserrat_600SemiBold',
          textDayHeaderFontFamily: 'Montserrat_500Medium',
          textDayFontSize: 14,
        }}
        markedDates={markedDates}
        onDayPress={(date) => {
          const allDates = createCalendarMarkedDates(pastWorkoutDates);
          if (allDates[date.dateString]) {
            allDates[date.dateString] = { selected: true, marked: allDates[date.dateString].marked, selectedColor: COLORS[colorTheme][0] };
          } else {
            allDates[date.dateString] = { selected: true, marked: false, selectedColor: COLORS[colorTheme][0] };
          }
          setMarkedDates(allDates);

          if (firstRun.current) {
            firstRun.current = false;
          }
          const formattedDate = formatDate(new Date(date.dateString));
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
      {showWorkout ? (
        <FlatList
          data={exercises}
          keyExtractor={(item, index) => item.name + item.date + index.toString()}
          renderItem={({ item, index }) => {
            const isReps = 'reps' in item.sets[0];
            return (
              <CalendarWorkoutCard color={COLORS[colorTheme][index % (COLORS[colorTheme].length - 1)]} name={item.name} sets={item.sets} isReps={isReps} />
            );
          }}
        />
      ) : (
        <View style={{
          flex: 1, widht: '100%', alignItems: 'center', justifyContent: 'center',
        }}
        >
          <NoWorkoutText>No workout performed</NoWorkoutText>
        </View>
      )}
    </View>
  );
};

export default CalendarView;
