import * as React from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default (props) => (
  <TouchableOpacity style={styles.container} onPress={props.onPress}>
    <View style={styles.topWrapper}>
      <Text>{props.name}</Text>
      <FontAwesome5
        name="ellipsis-h"
        size={18}
        style={styles.icon}
        color="black"
        onPress={props.onIconPress}
      />
    </View>
    <Text>{props.subtext}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    width: 175,
    height: 90,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#5DB075',
    padding: 13,
    margin: 10,
    shadowOpacity: 0.6,
    shadowRadius: 3,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
  },
  topWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 25,
    height: 20,
    textAlign: 'center',
  },
});
