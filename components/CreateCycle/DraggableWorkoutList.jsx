import * as React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import DraggableFlatList from 'react-native-draggable-flatlist';
import ExpandableWorkoutCard from './ExpandableWorkoutCard';
import { COLORS } from '../../constants';

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
          color={COLORS[item.index % COLORS.length]}
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

DraggableWorkoutList.defaultProps = {
  workouts: [],
  passWorkoutList: () => {},
};

export default DraggableWorkoutList;
