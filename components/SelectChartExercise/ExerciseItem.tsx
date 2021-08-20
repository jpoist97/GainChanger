import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { COLORS } from '../../constants';

const Exercise = styled.Text`
   font-family: 'Montserrat_600SemiBold';
   font-size: 16px;
`;

const BodyPart = styled.Text`
   color: #a8a4a4;
   font-size: 12px;
   font-family: 'Montserrat_500Medium';
   margin: 0px 0%;
`;

const AddButton = styled(FontAwesome)`
   position: absolute;
   right: 10px;
   top: 18px;
   height: 25px;
   width: 25px;
   margin: 0px 25px 0px 0px;
`;

const ExerciseItem = (props) => {
   const colorTheme = useSelector((state) => state.settings.colorTheme);

   const { name, subtext, selected, onPress } = props;

   return (
      <TouchableOpacity
         style={{
            marginLeft: 10,
            paddingVertical: 10,
            borderBottomColor: 'lightgray',
            borderBottomWidth: 0.5,
         }}
         onPress={onPress}
      >
         <Exercise>{name}</Exercise>
         <BodyPart>{subtext}</BodyPart>
         {selected ? (
            <AddButton
               name="circle"
               size={22}
               color={COLORS[colorTheme][0]}
               onPress={onPress}
            />
         ) : (
            <View />
         )}
      </TouchableOpacity>
   );
};

ExerciseItem.propTypes = {
   subtext: PropTypes.string,
   name: PropTypes.string.isRequired,
   selected: PropTypes.bool,
   onPress: PropTypes.func,
};

ExerciseItem.defaultProps = {
   subtext: '',
   selected: false,
};

export default ExerciseItem;
