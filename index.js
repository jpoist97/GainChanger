import { AppRegistry } from 'react-native';
import { registerRootComponent } from 'expo';
import React from 'react';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

const store = configureStore()

const RNRedux = () => (
  <Provider store = { store }>
    <App />
  </Provider>
)

registerRootComponent(RNRedux);