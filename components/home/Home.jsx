import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ScreenStackHeaderCenterView } from 'react-native-screens';
import { Button } from 'react-native-paper';

{/* Temporary workout variables*/}
let workout1 = "Workout 1"
let workout2 = "Workout 2"

export default class App extends React.Component {

   render() {
      return (
         <View style = {styles.container}>


            {/*Cycles Section*/}
            <View style = {{...styles.sectionComponent, margin: 30}}>
               <Text style = {styles.title}>
                  Cycles
               </Text>
               <Button contentStyle={{width: 331, height: 170}} style = {[{backgroundColor: "#5DB075", borderRadius: 20, borderColor: "#5DB075", position: "absolute", top: 60, alignSelf: "center"}]} color = "#FFFFFF" onPress = {() => alert("This should start the current workout in the cycle")}>
                  Start Cycle Workout
               </Button>
               <Button contentStyle = {{width: 325, height: 35}} style = {styles.seeAllButton} color = "#000000" onPress = {() => alert("This should take you to workouts tab")}>
                  See all cycles
               </Button>
            </View>


            {/*Workouts Section*/}
            <View style = {{...styles.sectionComponent, margin: 10}}>
               <Text style = {styles.title}>
                  Workouts
               </Text>

               <Text style = {[{position: "absolute", top: 82, left: 10, fontSize: 18}]}>
                  Workout 1
               </Text>

               <Text style = {[{position: "absolute", top: 157, left: 10, fontSize: 18}]}>
                  Workout 2
               </Text>

               <Button contentStyle = {{width: 100, height: 35}} style = {{...styles.startButton, right: 10, top: 75}} color = "#FFFFFF" onPress = {() => alert("This should start recording " + workout1)}>
                  Start
               </Button>

               <Button contentStyle = {{width: 100, height: 35}} style = {{...styles.startButton, right: 10, top: 150}} color = "#FFFFFF" onPress = {() => alert("This should start recording " + workout2)}>
                  Start
               </Button>
                  
               <Button contentStyle = {{width: 325, height: 35}} style = {styles.seeAllButton} color = "#000000" onPress = {() => alert("This should take you to workouts tab")}>
                  See all workouts
               </Button>

                 
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
      fontSize: 28,
   },
   startButton: {
      backgroundColor: "#5DB075",
      borderRadius: 20,
      position: "absolute"
   },
   seeAllButton: {
      borderRadius: 20, 
      borderWidth: 3, 
      borderColor: "#5DB075", 
      position: "absolute", 
      bottom: 20, 
      alignSelf: "center"
   },
   sectionComponent: {
      width: "95%", 
      height: "40%", 
      backgroundColor: "#F6F6F6", 
      borderWidth: 5, 
      borderRadius: 20, 
      borderColor: "#5DB075"
   }
})

