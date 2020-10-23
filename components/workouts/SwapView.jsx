import React, {useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import Card from './Card';

/**
 *
 */

export default (props) => {
   const [toggleText, setToggleText] = useState('')
   
   return (
  <View style={styles.container}>
    <View style={styles.toggleButton}>
      <Text>{}</Text>
    </View>
    <Swiper
      loop={false}
      showsPagination={false}
      index={0}
    >
      {props.left}
      {props.right}
    </Swiper>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent:'center',
   //  backgroundColor: '#c4c4c4',
    paddingLeft: 10
  },
  toggleButton: {
     backgroundColor: '#c4c4c4',
     width: 375,
     marginLeft: 10,
     borderRadius: 5,
     height: 30,
  },
});
