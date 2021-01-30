import React from 'react';
import { Image, View } from 'react-native';

export default () => (
  <View style={{ alignItems: 'center', marginTop: 210 }}>
    <Image
      source={require('../../assets/logo.png')}
      style={{
        width: 300,
        height: 400,
      }}
    />
  </View>
);
