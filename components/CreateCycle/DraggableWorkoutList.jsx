import * as React from 'react';
import PropTypes from 'prop-types';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useSelector } from 'react-redux';
import ExpandableWorkoutCard from './ExpandableWorkoutCard';
import { COLORS } from '../../constants';

const DraggableWorkoutList = (props) => {
   const { workouts, passWorkoutList, removeWorkout } = props;

   const [workoutList, setWorkoutList] = React.useState(workouts);
   const colorTheme = useSelector((state) => state.settings.colorTheme);

   React.useEffect(() => {
      passWorkoutList(workoutList);
   }, [workoutList]);

   const renderCard = ({ item, index, drag }) => (
      <ExpandableWorkoutCard
         drag={drag}
         removeWorkout={removeWorkout(index)}
         name={item.name}
         muscleGroups={item.muscleGroups}
         color={COLORS[colorTheme][index % (COLORS[colorTheme].length - 1)]}
         exercises={item.exercises}
      />
   );

   return (
      <DraggableFlatList
         data={workoutList}
         keyExtractor={(item, index) => item.id.toString() + index}
         onDragEnd={({ data }) => setWorkoutList(data)}
         renderItem={renderCard}
      />
   );
};

DraggableWorkoutList.propTypes = {
   workouts: PropTypes.array.isRequired,
   passWorkoutList: PropTypes.func.isRequired,
};

export default DraggableWorkoutList;
