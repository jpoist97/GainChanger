import { IconButton } from 'react-native-paper';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import React from 'react';
import ExercisesView from './ExercisesView';

const CycleTitle = styled.Text`
   color: #FFFFFF;
   font-size: 24px;
   font-family: 'Montserrat_500Medium';
   textAlign: left;
   paddingLeft: 15px;
   paddingTop: 5px;
`;

const SubTitle = styled(CycleTitle)`
    font-size: 16px;
    paddingBottom: 5px;
    font-family: 'Montserrat_600SemiBold';
`;

const ExpandableWorkoutCard = (props) => {
  const [showDetailed, setshowDetailed] = React.useState(false);
  const [icon, setIcon] = React.useState('chevron-down');

  const {
    name, muscleGroups, color, exercises, drag,
  } = props;

  const FullBody = styled.TouchableOpacity`
        width: 90%;
        margin: auto;
        background-color: ${color};
        borderRadius: 10px;
        box-shadow: 1px 5px 2px gray;
        marginBottom: 10px;
        marginTop: 10px;
        padding: 10px;
    `;

  function showDetail() {
    if (icon === 'chevron-down') {
      setIcon('chevron-up');
    } else {
      setIcon('chevron-down');
    }
    setshowDetailed(!showDetailed);
  }

  return (
    <FullBody
      onLongPress={drag}
      onPress={showDetail}
    >
      <CycleTitle>{name}</CycleTitle>
      <IconButton
        icon={icon}
        color="white"
        size={25}
        style={{ position: 'absolute', alignSelf: 'flex-end', marginTop: 0 }}
      />
      {!showDetailed && <SubTitle>{muscleGroups}</SubTitle>}
      {showDetailed && <ExercisesView exercises={exercises} />}
    </FullBody>
  );
};

ExpandableWorkoutCard.propTypes = {
  name: PropTypes.string,
  muscleGroups: PropTypes.string,
  color: PropTypes.string,
  exercises: PropTypes.array,
};

ExpandableWorkoutCard.defaultProps = {
  name: 'Cycle Name',
  muscleGroups: '',
  color: '#CAB0FF',
  exercises: [],
};

export default ExpandableWorkoutCard;
