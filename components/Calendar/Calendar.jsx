import * as React from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import CalendarWorkoutCard from './CalendarWorkoutCard';

// eslint-disable-next-line no-unused-vars
const CalendarView = (props) => {

  return (
  <View style={{ flex: 1, justifyContent: 'center', height: 500}}>
    <Calendar
      // Specify style for calendar container element. Default = {}
      style={{
        height: 350,      
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
      onDayPress={(day) => {console.log('selected day', day["dateString"])}} //CHANGE TO SHOW RECORD COMPONENT
      enableSwipeMonths={true}
    />
  </View>
  )
};

export default CalendarView;