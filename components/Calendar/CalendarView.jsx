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

const CalendarView = () => {
  const pastWorkoutDates = useSelector((state) => state.dates.dates);
  const workoutRecords = useSelector((state) => state.records.records);
  const colorTheme = useSelector((state) => state.settings.colorTheme);

  const [selectedDate, setselectedDate] = React.useState('No date selected.');
  const [exercises, setExercises] = React.useState([]);
  const [markedDates, setMarkedDates] = React.useState({});
  const [showWorkout, setShowWorkout] = React.useState(false);

  const currentUser = firebase.auth().currentUser.uid;
  const userRef = firebase.firestore().collection('users').doc(currentUser);

  const dispatch = useDispatch();

  const createCalendarMarkedDates = (dates, color) => {
    const marks = {};
    dates.forEach((date) => {
      marks[date] = { marked: true, selectedColor: color };
    });
    return marks;
  };

  React.useEffect(() => {
    setMarkedDates(createCalendarMarkedDates(pastWorkoutDates, COLORS[colorTheme][0]));
    setExercises([]);
    setselectedDate('No date selected.');
  }, [colorTheme]);

  const formatDate = (date) => `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate() + 1}`;

  const getDateRecords = async (user, currentDate) => {
    setShowWorkout(true);
    if (workoutRecords[currentDate]) {
      console.log('Record found in redux.');
      setExercises(workoutRecords[currentDate]);
    } else {
      const recordsRef = user.collection('workoutRecords');
      const workoutRecordSnapshot = await recordsRef.where('date', '==', currentDate).get();

      if (workoutRecordSnapshot.empty) {
        setShowWorkout(false);
        return;
      }

      workoutRecordSnapshot.forEach((doc) => {
        const data = doc.data();
        const exerciseRecord = data.exercises;
        const workoutSets = [];

        exerciseRecord.forEach((record) => {
          workoutSets.push(record);
          dispatch(actions.records.addWorkoutRecord(record, currentDate));
        });
        setExercises(workoutSets);
      });
    }
  };

  const onDayPress = (date) => {
    const allDates = createCalendarMarkedDates(pastWorkoutDates, COLORS[colorTheme][0]);
    allDates[date.dateString] = { marked: allDates[date.dateString] ? allDates[date.dateString].marked : false, selectedColor: COLORS[colorTheme][0], selected: true };
    setMarkedDates(allDates);

    const formattedDate = formatDate(new Date(date.dateString));
    if (selectedDate !== formattedDate) {
      setExercises([]);
      setselectedDate(formattedDate);
      getDateRecords(userRef, date.dateString);
    }
  };

  return (
    <View style={{ justifyContent: 'center', height: '100%' }}>
      {colorTheme === 'default'
    && (
    <Calendar
      style={{
        marginTop: 50,
      }}
      theme={{
        backgroundColor: '#f2f2f2',
        calendarBackground: '#f2f2f2',
        todayTextColor: COLORS.default[0],
        dotColor: COLORS.default[0],
        arrowColor: COLORS.default[0],
        monthTextColor: 'black',
        textDayFontFamily: 'Montserrat_500Medium',
        textMonthFontFamily: 'Montserrat_600SemiBold',
        textDayHeaderFontFamily: 'Montserrat_500Medium',
        textDayFontSize: 14,
      }}
      markedDates={markedDates}
      onDayPress={(date) => onDayPress(date)}
      enableSwipeMonths
    />
    )}
      {colorTheme === 'aqua'
      && (
      <Calendar
        style={{
          marginTop: 50,
        }}
        theme={{
          backgroundColor: '#f2f2f2',
          calendarBackground: '#f2f2f2',
          todayTextColor: COLORS.aqua[0],
          dotColor: COLORS.aqua[0],
          arrowColor: COLORS.aqua[0],
          monthTextColor: 'black',
          textDayFontFamily: 'Montserrat_500Medium',
          textMonthFontFamily: 'Montserrat_600SemiBold',
          textDayHeaderFontFamily: 'Montserrat_500Medium',
          textDayFontSize: 14,
        }}
        markedDates={markedDates}
        onDayPress={(date) => onDayPress(date)}
        enableSwipeMonths
      />
      )}

      {colorTheme === 'red'
    && (
    <Calendar
      style={{
        marginTop: 50,
      }}
      theme={{
        backgroundColor: '#f2f2f2',
        calendarBackground: '#f2f2f2',
        todayTextColor: COLORS.red[0],
        dotColor: COLORS.red[0],
        arrowColor: COLORS.red[0],
        monthTextColor: 'black',
        textDayFontFamily: 'Montserrat_500Medium',
        textMonthFontFamily: 'Montserrat_600SemiBold',
        textDayHeaderFontFamily: 'Montserrat_500Medium',
        textDayFontSize: 14,
      }}
      markedDates={markedDates}
      onDayPress={(date) => onDayPress(date)}
      enableSwipeMonths
    />
    )}

      {colorTheme === 'multi'
    && (
    <Calendar
      style={{
        marginTop: 50,
      }}
      theme={{
        backgroundColor: '#f2f2f2',
        calendarBackground: '#f2f2f2',
        todayTextColor: COLORS.multi[0],
        dotColor: COLORS.multi[0],
        arrowColor: COLORS.multi[0],
        monthTextColor: 'black',
        textDayFontFamily: 'Montserrat_500Medium',
        textMonthFontFamily: 'Montserrat_600SemiBold',
        textDayHeaderFontFamily: 'Montserrat_500Medium',
        textDayFontSize: 14,
      }}
      markedDates={markedDates}
      onDayPress={(date) => onDayPress(date)}
      enableSwipeMonths
    />
    )}

      <View style={{
        width: '90%', alignSelf: 'center', height: 2, backgroundColor: '#e5e5e5', marginTop: 25,
      }}
      />
      <View style={{ justifyContent: 'flex-start', width: '100%', paddingLeft: 20 }}>
        <DayTitle>{selectedDate}</DayTitle>
      </View>
      {showWorkout ? (
        <FlatList
          data={exercises}
          keyExtractor={(item, index) => item.name + item.date + index.toString()}
          renderItem={({ item, index }) => {
            const isReps = 'reps' in item.sets[0];
            return (
              <CalendarWorkoutCard color={COLORS[colorTheme][index % (COLORS[colorTheme].length - 1)]} name={item.exerciseName} sets={item.sets} isReps={isReps} />
            );
          }}
        />
      ) : (
        <View style={{
          flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center',
        }}
        >
          <NoWorkoutText>No workout performed</NoWorkoutText>
        </View>
      )}
    </View>
  );
};

export default CalendarView;
