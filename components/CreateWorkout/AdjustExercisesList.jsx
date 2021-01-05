/* eslint-disable react/forbid-prop-types */
import * as React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import AdjustExerciseCard from './AdjustExerciseCard';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'


const Title = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 24px;
  margin: 0px 5% 5px 5%;
`;

const AdjustExercisesList = (props) => {
  const {
    items, setReps, setSets, setSeconds, removeExercise, toggleType, updateOrder
  } = props;

  const [exerciseList, setExerciseList] = React.useState(items);

  React.useEffect(() => {
    updateOrder(exerciseList);
  }, [exerciseList]);
  
  const renderCard = ({ item, index, drag }) => (
    <AdjustExerciseCard
      drag={drag}
      name={item.name}
      displayEllipses={item.displayEllipses}
      color={item.color}
      sets={item.sets}
      reps={item.reps}
      seconds={item.seconds}
      isReps={item.isReps}
      setReps={setReps(index)}
      setSets={setSets(index)}
      setSeconds={setSeconds(index)}
      toggleType={toggleType(index)}
      removeExercise={removeExercise(index)}
    />
  );

  return (
    <View style={{ height: '92%' }}>
      <Title>Exercises</Title>
      <KeyboardAwareView animated={true}>
        <DraggableFlatList 
          data={items}
          keyExtractor={(item, index) => item.id.toString() + index}
          onDragEnd={({ data }) => setExerciseList(data)}
          renderItem={renderCard}
        />
      </KeyboardAwareView>
    </View>

  );
};

AdjustExercisesList.propTypes = {
  items: PropTypes.array.isRequired,
};

export default AdjustExercisesList;
