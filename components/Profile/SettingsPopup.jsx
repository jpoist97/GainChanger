import React from 'react';
import { Text } from 'react-native';
import {
  Menu, MenuOptions, MenuOption, MenuTrigger,
} from 'react-native-popup-menu';
import Proptypes from 'prop-types';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const StyledText = styled.Text`
   font-family: 'Montserrat_500Medium';
   font-size: 12px;
`;

const SettingsPopup = (props) => {
  const { style, options, triggerSize } = props;

  return (
    <Menu style={style}>
      <MenuTrigger>
        <Ionicons name="ios-settings" size={triggerSize} color="black" />
      </MenuTrigger>
      <MenuOptions customStyles={{
        optionsContainer: {
          backgroundColor: '#EDEDF0', borderRadius: 10, padding: 5, width: 'auto',
        },
      }}
      >
        {options.map((option, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <MenuOption key={option.text + index} onSelect={option.onPress}>
            <Text>
              <StyledText>{option.text}</StyledText>
            </Text>
          </MenuOption>
        ))}

      </MenuOptions>
    </Menu>
  );
};

SettingsPopup.propTypes = {
  style: Proptypes.array,
  options: Proptypes.array.isRequired,
  triggerSize: Proptypes.number,
};

SettingsPopup.defaultProps = {
  style: [],
  triggerSize: 18,
};

export default SettingsPopup;
