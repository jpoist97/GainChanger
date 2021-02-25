import React from 'react';
import { Text } from 'react-native';
import {
  Menu, MenuOptions, MenuOption, MenuTrigger,
} from 'react-native-popup-menu';
import {
  FontAwesome5, MaterialIcons,
} from '@expo/vector-icons';
import Proptypes from 'prop-types';
import styled from 'styled-components/native';
import { COLORS } from '../../constants';
import { useSelector } from 'react-redux';

const ICON_MAP = {
  RUNNING: (<FontAwesome5 name="running" size={12} color="black" />),
  ALPHABET: (<MaterialIcons name="sort-by-alpha" size={12} color="black" />),
};

const StyledText = styled.Text`
   font-family: 'Montserrat_500Medium';
   font-size: 12px;
`;

const IconWrapper = styled.View`
   margin-right: 5px;
`;

const SortByPopup = (props) => {
  const { style, options, triggerSize } = props;

  const colorTheme = useSelector((state) => state.settings.colorTheme);

  return (
    <Menu style={style}>
      <MenuTrigger>
        <FontAwesome5
          name="sort-amount-down"
          size={triggerSize}
          color={COLORS[colorTheme][0]}
        />
      </MenuTrigger>
      <MenuOptions customStyles={{
        optionsContainer: {
          backgroundColor: '#EDEDF0', borderRadius: 10, padding: 5, width: 'auto',
        },
      }}
      >
        {options.map((option, index) => (
          /* eslint-disable react/no-array-index-key */
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

SortByPopup.propTypes = {
  style: Proptypes.array,
  options: Proptypes.array.isRequired,
  triggerSize: Proptypes.number,
};

SortByPopup.defaultProps = {
  style: [],
  triggerSize: 18,
};

export default SortByPopup;
