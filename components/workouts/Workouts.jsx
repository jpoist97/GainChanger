import * as React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

export default (props) => {
   return (    
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <Text>Workout Screen</Text>
         <Text>Replace these Text tags with your component</Text>
         <Button contentStyle={{width: 300, height: 150,}} style={[{backgroundColor: "#5DB075", borderRadius: 15, borderWidth: 3, borderColor: "#5DB075", position: "absolute", top: 75, alignSelf: "center"}]} icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
            Press me
         </Button>
      </View>);
}