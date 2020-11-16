/* eslint-disable react/prop-types */
import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TopBar = styled.View`
   width: 30%;
   position: absolute;
   right: 35%;
   background-color: #C4C4C4;
   border-radius: 5px;
   height: 5px;
`;

export default (props) => {
  const { children } = props;
  // Normal safe area view is buggy with animation for modal, used this instead
  const insets = useSafeAreaInsets();

  return (
    <View style={{ height: '100%', paddingTop: insets.top + 20, paddingBottom: insets.bottom - 35 }}>
      <TopBar style={{ position: 'absolute', top: insets.top + 5 }} />
      {children}
    </View>
  );
};
