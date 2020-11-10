/* eslint-disable react/forbid-prop-types, react/no-array-index-key */
import React from 'react';
import { Text } from 'react-native';
import {
  Menu, MenuOptions, MenuOption, MenuTrigger,
} from 'react-native-popup-menu';
import {
  FontAwesome5, MaterialIcons, AntDesign, Entypo,
} from '@expo/vector-icons';
import Proptypes from 'prop-types';
import styled from 'styled-components/native';

// Potential options for icons displayed in a popup option
const ICON_MAP = {
  EDIT: (<MaterialIcons name="edit" size={12} color="black" />),
  DELETE: (<AntDesign name="closecircleo" size={12} color="black" />),
  SELECT: (<AntDesign name="checkcircleo" size={12} color="black" />),
  SWAP: (<Entypo name="swap" size={12} color="black" />),
};

const StyledText = styled.Text`
   font-family: 'Montserrat_500Medium';
   font-size: 12px;
`;

const IconWrapper = styled.View`
   margin-right: 5px;
`;

const EllipsisPopup = (props) => {
  const { style, options, triggerSize } = props;

  return (
    <Menu style={style}>
      <MenuTrigger>
        <FontAwesome5
          name="ellipsis-h"
          size={triggerSize}
          color="black"
        />
      </MenuTrigger>
      <MenuOptions customStyles={{
        optionsContainer: {
          backgroundColor: '#EDEDF0', borderRadius: 10, padding: 5, width: 'auto',
        },
      }}
      >
        {options.map((option, index) => (
          <MenuOption key={option.text + index} onSelect={option.onPress}>
            <Text>
              <IconWrapper>{ICON_MAP[option.icon]}</IconWrapper>
              <StyledText>{option.text}</StyledText>
            </Text>
          </MenuOption>
        ))}

      </MenuOptions>
    </Menu>
  );
};

EllipsisPopup.propTypes = {
  style: Proptypes.array,
  options: Proptypes.array.isRequired,
  triggerSize: Proptypes.number,
};

EllipsisPopup.defaultProps = {
  style: [],
  triggerSize: 18,
};

export default EllipsisPopup;
