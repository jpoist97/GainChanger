import * as React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import styled from 'styled-components';
import CalendarWorkoutCard from './CalendarWorkoutCard';
import { format } from 'date-fns';

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

// eslint-disable-next-line no-unused-vars
const CalendarView = (props) => {

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const months = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

  var startDate = new Date();

  const [currentDate, setCurrentDate] = React.useState(formatDate(startDate));

  function formatDate(date) { 
    return days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + (date.getDate());
  }

  return (
  <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
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
        setCurrentDate(formatDate(jsDate));
      }} //CHANGE TO SHOW RECORD COMPONENT
      enableSwipeMonths={true}
    />
    <View style={{justifyContent:'flex-start', width: '100%', paddingLeft: 20}}>
    <DayTitle>Workout on {currentDate}</DayTitle>
    </View>
    <FlatList />
  </View>
  )
};

export default CalendarView;