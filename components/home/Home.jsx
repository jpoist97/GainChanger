import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Title } from 'react-native-paper';
import WorkoutContainer from './WorkoutContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 28,
  },
  startButton: {
    backgroundColor: '#5DB075',
    borderRadius: 20,
    position: 'absolute',
  },
  seeAllButton: {
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#5DB075',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  sectionComponent: {
    width: '95%',
    height: '40%',
    backgroundColor: '#F6F6F6',
    borderWidth: 5,
    borderRadius: 20,
    borderColor: '#5DB075',
  },
  startCycle: {
    backgroundColor: '#5DB075',
    borderRadius: 20,
    borderColor: '#5DB075',
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
  },
});

export default () => (
  <View style={styles.container}>

    {/* Cycles Section */}
    <View style={{ ...styles.sectionComponent, margin: 30 }}>

      <Title style={styles.title}>
        Cycles
      </Title>

      <Button contentStyle={{ width: 331, height: 170 }} style={styles.startCycle} color="#FFFFFF" onPress={() => alert('This should start the current workout in the cycle')}>
        Start Cycle Workout
      </Button>

      <Button contentStyle={{ width: 325, height: 35 }} style={styles.seeAllButton} color="#000000" onPress={() => alert('This should take you to workouts tab')}>
        See All Cycles
      </Button>

    </View>

    {/* Workouts Section */}
    <View style={{ ...styles.sectionComponent, margin: 10 }}>
      <Title style={styles.title}>
        Workouts
      </Title>

      <WorkoutContainer
        items={[{ name: 'Push Workout A' }, { name: 'Pull Workout A' }]}
      />

      <Button contentStyle={{ width: 325, height: 35 }} style={styles.seeAllButton} color="#000000" onPress={() => alert('This should take you to workouts tab')}>
        See All Workouts
      </Button>

    </View>
  </View>
);
