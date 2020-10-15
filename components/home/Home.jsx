import * as React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { ScreenStackHeaderCenterView } from 'react-native-screens';

{/* Temporary workout variables*/}
let workout1 = "Workout 1"
let workout2 = "Workout 2"

export default class App extends React.Component {

   render() {
      return (
         <View style = {styles.container}>


            {/*Cycles Section*/}
            <View style = {[{width: "95%", height: "40%", margin: 30, backgroundColor: "F6F6F6", borderWidth: 5, borderRadius: 15, borderColor: "#5DB075"}]}>
               <Text style = {styles.title}>
                  Cycles
               </Text>
               <View style = {[{width:"85%", height: "45%", backgroundColor: "#5DB075", borderRadius: 15, borderWidth: 3, borderColor: "#5DB075", position: "absolute", top: 75, alignSelf: "center"}]}>
                  <Button
                     title = "Start Workout for Today's Cyclei"
                     color = "#FFFFFF"
                     onPress = {() => alert("This should start the current workout in the cycle")}
                  />
               </View>
               <View style = {[{width:"85%", borderRadius: 15, borderWidth: 3, borderColor: "#5DB075", position: "absolute", bottom: 20, alignSelf: "center"}]}>
                  <Button
                     title = "See all cycles"
                     color = "#000000"
                     onPress = {() => alert("This should take you to workouts tab")}
                  />
               </View>
            </View>


            {/*Workouts Section*/}
            <View style = {[{width: "95%", height: "40%", margin: 10, backgroundColor: "#F6F6F6", borderWidth: 5, borderRadius: 15, borderColor: "#5DB075"}]}>
               <Text style = {styles.title}>
                  Workouts
               </Text>
               <Text style = {[{position: "absolute", top: 82, left: 10, fontSize: 18}]}>
                  Workout 1 
               </Text>
               <Text style = {[{position: "absolute", top: 157, left: 10, fontSize: 18}]}>
                  Workout 2
               </Text>
               <View style = {[{width:"25%", backgroundColor: "#5DB075", borderRadius: 15, position: "absolute", right: 10, top: 75}]}>
                  <Button style = {[{width: "25%", height: "10%", margin: 10}]}
                     title = "Start"
                     color = "#FFFFFF"
                     onPress = {() => alert("This should start recording " + workout1)}
                  />
               </View>
               <View style = {[{width:"25%", backgroundColor: "#5DB075", borderRadius: 15, position: "absolute", right: 10, top: 150}]}>
                  <Button style = {[{width: "25%", height: "10%", margin: 10}]}
                     title = "Start"
                     color = "#FFFFFF"
                     onPress = {() => alert("Thus should start recording " + workout2)}
                  />
               </View>
               <View style = {[{width:"85%", borderRadius: 15, borderWidth: 3, borderColor: "#5DB075", position: "absolute", bottom: 20, alignSelf: "center"}]}>
                  <Button
                     title = "See all workouts"
                     color = "#000000"
                     onPress = {() => alert("This should take you to workouts tab")}
                  />
               </View>
            </View>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F6F6F6",
   },
   title: {
      textAlign: "center",
      marginVertical: 8,
      fontSize: 28
   }
})

