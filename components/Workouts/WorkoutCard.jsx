import React from 'react';
import { TouchableOpacity, View, Alert } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import EllipsePopup from '../utils/EllipsisPopup';

const NameText = styled.Text`
   color: #efefef;
   font-size: 24px;
   font-family: 'Montserrat_500Medium';
`;

const Subtext = styled.Text`
   color: #efefef;
   font-size: 20px;
   position: absolute;
   bottom: 15px;
   left: 25px;
   font-family: 'Montserrat_500Medium';
`;

const StyledEllipsisPopup = styled(EllipsePopup)`
   position: absolute;
   right: 10px;
   top: 18px;
   height: 25px;
   width: 25px;
`;

const WorkoutCard = (props) => {
   const {
      color,
      subtext,
      name,
      onPress,
      deleteWorkout,
      editWorkout,
      displayEllipses,
   } = props;

   const StyledView = styled(TouchableOpacity)`
      background-color: ${color};
      width: 40%;
      height: 180px;
      border-radius: 20px;
      padding: 15px 0px;
      padding-right: 50px;
      padding-left: 15px;
      margin: 10px 0px
      box-shadow: 3px 5px 2px #00000050;
   `;

   return (
      <StyledView onPress={onPress}>
         <NameText>{name}</NameText>
         {displayEllipses ? (
            <StyledEllipsisPopup
               options={[
                  {
                     icon: 'EDIT',
                     text: 'Edit Workout',
                     onPress: editWorkout,
                  },
                  {
                     icon: 'DELETE',
                     text: 'Delete Workout',
                     onPress: () =>
                        Alert.alert(
                           'Delete Confirmation',
                           `Are you sure you want to delete ${name}?`,
                           [
                              {
                                 text: 'Cancel',
                                 style: 'cancel',
                              },
                              {
                                 text: 'Delete',
                                 style: 'destructive',
                                 onPress: deleteWorkout,
                              },
                           ]
                        ),
                  },
               ]}
            />
         ) : (
            <View />
         )}
         <Subtext>{subtext}</Subtext>
      </StyledView>
   );
};

WorkoutCard.propTypes = {
   color: PropTypes.string,
   subtext: PropTypes.string,
   name: PropTypes.string.isRequired,
   displayEllipses: PropTypes.bool,
   onPress: PropTypes.func,
   deleteWorkout: PropTypes.func,
   editWorkout: PropTypes.func,
};

WorkoutCard.defaultProps = {
   color: '#CAB0FF',
   subtext: '',
   displayEllipses: true,
};

export default WorkoutCard;
