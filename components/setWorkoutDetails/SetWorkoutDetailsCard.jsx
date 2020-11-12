import React from 'react';
import {
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 

const NameText = styled.Text`
   color: #EFEFEF;
   font-size: 24px;
   font-family: 'Montserrat_500Medium';
`;

const Ellipsis = styled(FontAwesome5)`
   position: absolute;
   right: 10px;
   top: 18px;
   height: 25px;
   width: 25px;
`;

const StyledIcon = styled(AntDesign)`
   padding: 0px 10px;
`;

const ContentWrapper = styled.View`
  flexDirection: row;
  padding: 3px 0px;
`;
const StyledInput = styled.TextInput`
  width: 70px;
  height: 25px;
  background-color: #FFFFFF;
  border-radius: 5px;
  text-align: center;
  font-family: 'Roboto_400Regular';
  font-size: 16px;
`;

const StyledText = styled.Text`
  font-family: 'Roboto_400Regular';
  color: #FFF;
  font-size: 18px;
  height: 25px;
  text-align: center;
  padding: 2px 15px; 0px 0px;
`;

const SetWorkoutDetailsCard = (props) => {
  const {
    color, name, onIconPress, displayEllipses,
  } = props;
  const [sets, setSets] = React.useState(0);
  const [reps, setReps] = React.useState(0);

  const StyledView = styled.View`
      background-color: ${color};
      width: 90%;
      height: 120px;
      border-radius: 20px;
      padding: 15px;
      margin: 10px 5%;
      box-shadow: 3px 5px 2px #00000050;
   `;
  return (
    <StyledView>
      <NameText>{name}</NameText>
      {displayEllipses ? (
        <Ellipsis
          name="ellipsis-h"
          size={18}
          color="black"
          onPress={onIconPress}
        />
      ) : <View />}
      <ContentWrapper>
        <StyledText style={{marginLeft: '14%'}}>Sets</StyledText>
        <StyledText style={{marginLeft: '32%'}}>Reps</StyledText>
      </ContentWrapper>
      <ContentWrapper>
        <StyledIcon name="minus" size={26} color="white" style={{marginLeft: '0%'}} onPress={() => console.log(parseInt(sets) - 1)}/>
        <StyledInput value={sets} placeholder="3" keyboardType="numeric" />
        <StyledIcon name="plus" size={26} color="white" onPress={() => setSets(sets + 1)}/>

        <StyledIcon name="minus" size={26} color="white" style={{marginLeft: '5%'}} onPress={() => setReps(reps + 1)}/>
        <StyledInput value={reps} placeholder="10" keyboardType="numeric" />
        <StyledIcon name="plus" size={26} color="white" onPress={() => setReps(reps + 1)}/>
      </ContentWrapper>
    </StyledView>
  );
};

SetWorkoutDetailsCard.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  displayEllipses: PropTypes.bool,
  onIconPress: PropTypes.func,
};

SetWorkoutDetailsCard.defaultProps = {
  color: '#CAB0FF',
  displayEllipses: true,
  onIconPress: () => {},
};

export default SetWorkoutDetailsCard;
