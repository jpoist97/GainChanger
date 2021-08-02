import { IconButton } from 'react-native-paper';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import React from 'react';
import ExercisesView from './ExercisesView';

const CycleTitle = styled.Text`
   color: #ffffff;
   font-size: 24px;
   font-family: 'Montserrat_500Medium';
   textalign: left;
   paddingleft: 15px;
   paddingtop: 5px;
`;

const SubTitle = styled(CycleTitle)`
   font-size: 16px;
   paddingbottom: 5px;
   font-family: 'Montserrat_600SemiBold';
`;

const ExpandableWorkoutCard = (props) => {
   const [showDetailed, setshowDetailed] = React.useState(false);
   const [icon, setIcon] = React.useState('chevron-down');

   const { name, muscleGroups, color, exercises, drag, removeWorkout } = props;

   const FullBody = styled.TouchableOpacity`
      width: 90%;
      margin: auto;
      background-color: ${color};
      borderradius: 10px;
      box-shadow: 1px 5px 2px gray;
      marginbottom: 10px;
      margintop: 10px;
      padding: 10px;
   `;

   function showDetail() {
      if (icon === 'chevron-down') {
         setIcon('trash-can-outline');
      } else {
         setIcon('chevron-down');
      }
      setshowDetailed(!showDetailed);
   }

   return (
      <FullBody onLongPress={drag} onPress={showDetail}>
         <CycleTitle>{name}</CycleTitle>
         <IconButton
            icon={icon}
            color="white"
            size={25}
            onPress={() => {
               if (icon === 'trash-can-outline') {
                  removeWorkout();
                  showDetail();
               } else {
                  showDetail();
               }
            }}
            style={{
               position: 'absolute',
               alignSelf: 'flex-end',
               marginTop: 0,
            }}
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
