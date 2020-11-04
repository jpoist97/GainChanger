/* eslint-disable */
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Subheading } from 'react-native-paper';

const buttonStartLocation = 28;
const textStartLocation = 30;

const styles = StyleSheet.create({
  startButton: {
    backgroundColor: '#5DB075',
    borderRadius: 20,
    position: 'absolute',
    right: 15,
  },
});

export default (props) => (
  <View>
    {props.items.map((item, index) => (
      <View>
        <Button contentStyle={{ width: 100, height: 35 }} style={{ ...styles.startButton, top: buttonStartLocation + index * 80 }} color="#FFFFFF" onPress={() => alert(`This should start recording ${item.name}`)}>
          Start
        </Button>

        <Subheading style={[{
          position: 'absolute', top: textStartLocation + index * 80, left: 15, fontSize: 18,
        }]}
        >
          {item.name}
        </Subheading>

      </View>
    ))}
  </View>

);
