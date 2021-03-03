import React from 'react';
import {
  TouchableOpacity,
  Alert,
} from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import EllipsisPopup from '../utils/EllipsisPopup';

const NameText = styled.Text`
   color: #EFEFEF;
   font-size: 24px;
   font-family: 'Montserrat_500Medium';
`;

const Subtext = styled.Text`
   color: #EFEFEF;
   font-size: 20px;
   position: absolute;
   bottom: 15px;
   left: 25px;
   font-family: 'Montserrat_500Medium';
`;

const StyledEllipsisPopup = styled(EllipsisPopup)`
   position: absolute;
   right: 15px;
   top: 15px;
   height: 25px;
   width: 25px;
`;

const CycleCard = (props) => {
  const {
    color, subtext, name, onPress, deleteCycle, selectCycle, isSelectedCycle,
  } = props;

  const StyledView = styled(TouchableOpacity)`
      background-color: ${color};
      width: 90%;
      height: 100px;
      border-radius: 20px;
      padding: 15px 25px;
      margin: 10px 5%;
      box-shadow: 3px 5px 2px #00000050;
   `;

  return (
    <StyledView onPress={onPress}>
      <NameText>{name}</NameText>
      <StyledEllipsisPopup
        options={[
          { icon: 'SELECT', text: 'Select Cycle', onPress: selectCycle },
          {
            icon: 'DELETE',
            text: 'Delete Cycle',
            onPress: () => {
              if (isSelectedCycle) {
                Alert.alert('Cannot delete the selected cycle, please select a different cycle and try again.');
              } else {
                Alert.alert('Delete Confirmation', `Are you sure you want to delete ${name}?`, [{
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: deleteCycle,
                }]);
              }
            },
          }]}
      />
      <Subtext>{subtext}</Subtext>
    </StyledView>
  );
};

CycleCard.propTypes = {
  color: PropTypes.string,
  subtext: PropTypes.string,
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  deleteCycle: PropTypes.func,
  selectCycle: PropTypes.func,
  isSelectedCycle: PropTypes.bool,
};

CycleCard.defaultProps = {
  color: '#CAB0FF',
  subtext: '',
  onPress: () => {},
  deleteCycle: () => {},
  selectCycle: () => {},
  isSelectedCycle: false,
};

export default CycleCard;
