import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Card from './Card';

/**
 * 
 */

export default (props) => {
   return (    
      <View style={styles.container}>
         {props.items.map((item, index) => 
            (<Card 
               name={item.name} 
               subtext={item.subtext} 
               onIconPress={item.onIconPress}
               key={index}/>)
            )}
         {/* 
            This is because Flexbox will incorrectly space the last row if there
            is an odd number of children, adds an inivisble child to balance.
         */}
         {props.items.length % 2 === 1 ? <View style={styles.invisibleCard}/>: ''}
      </View>);
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      alignContent: 'flex-start',
      width: '95%',
   },
   invisibleCard: {
      width: '43%',
      height: 100,
      margin: 10
   }
});