import * as React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import ExpandableCycleCard from './CycleOrder';
import DraggableFlatList from 'react-native-draggable-flatlist';

const FullCycleOrder = (props) => {

  const { 
    workouts, passWorkoutList 
  } = props;

  const [workoutList, setWorkoutList] = React.useState(workouts)

  React.useEffect(() => {
    passWorkoutList(workoutList)
  }, [workoutList]);

  return (
    <DraggableFlatList
      data={workoutList}
      keyExtractor={(item, index) => item.id.toString() + index}
      onDragEnd={({data}) => setWorkoutList(data) }
      renderItem={({ item, drag}) => (
        <ExpandableCycleCard
          drag={drag}
          name={item.name}
          muscleGroups={item.muscleGroups}
          color={item.color}
          exercises={item.exercises}
        />
      )}
    />
  );
};

FullCycleOrder.propTypes = {
  workouts: PropTypes.array.isRequired,
  passWorkoutList: PropTypes.func.isRequired,
};

FullCycleOrder.defaultProps = {
  workouts: [],
  passWorkoutList: () => {},
};

export default FullCycleOrder;
