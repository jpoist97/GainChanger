import * as React from 'react';
import PropTypes from 'prop-types';
import DraggableFlatList from 'react-native-draggable-flatlist';
import ExpandableWorkoutCard from './ExpandableWorkoutCard';

const DraggableWorkoutList = (props) => {
  const {
    workouts, passWorkoutList,
  } = props;

  const [workoutList, setWorkoutList] = React.useState(workouts);

  React.useEffect(() => {
    passWorkoutList(workoutList);
  }, [workoutList]);

  return (
    <DraggableFlatList
      data={workoutList}
      keyExtractor={(item, index) => item.id.toString() + index}
      onDragEnd={({ data }) => setWorkoutList(data)}
      renderItem={({ item, drag }) => (
        <ExpandableWorkoutCard
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

DraggableWorkoutList.propTypes = {
  workouts: PropTypes.array.isRequired,
  passWorkoutList: PropTypes.func.isRequired,
};

export default DraggableWorkoutList;
