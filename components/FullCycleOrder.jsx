import * as React from 'react'
import { View } from 'react-native';
import styled from 'styled-components/native'
import CycleOrderCard from './CycleOrder';

const Container = styled.ScrollView`
    flexDirection: column;
    flex: 1;
    width:100%;
`;


const exercises1 = [
    {
      workoutName: "Test 1",
      reps: 12,
      sets: 4,
      previous: 125
    },
    {
      workoutName: "Test 2",
      reps: 8,
      sets: 3,
      previous: 225
    }
  ]
  
  const exercises2 = [
    {
      workoutName: "Test 3",
      reps: 12,
      sets: 4,
      previous: 125
    },
    {
      workoutName: "Test 4",
      reps: 8,
      sets: 3,
      previous: 225
    }
  ]
  
  const workouts =[
    {
      title: "Routine 1",
      type: "biceps, back",
      color: "#9D8DFF",
      exercises: exercises1
    },
    {
      title: "Routine 2",
      type: "chest, triceps",
      color: "#CAB0FF",
      exercises: exercises2
    }
  ]
  

export default (props) => {
    const workouts = props.workouts;
    //not working rn, define props and prop types
    return (
        <View>
            {workouts.map((workout) => {
                console.log(workout.exercises);
                <CycleOrderCard title={workout.title}
                    type={workout.type}
                    color={workout.color}
                    workouts={workout.exercises}
                />
            }
            )}
        </View>
    )
}