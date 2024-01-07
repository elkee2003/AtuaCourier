/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  StatusBar,
} from 'react-native';

import HomeNavigator from './src/Navigation/Home';

function App() {

  return (
    <>
      <StatusBar/>
      <HomeNavigator/>
    </>      
  );
}


export default App;
