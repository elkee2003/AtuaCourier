/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StatusBar,
  Text,
  View,
} from 'react-native';

import HomeScreen from './src/screens/HomeScreen';

function App() {

  return (
    <>
      <StatusBar/>
      <HomeScreen/>
    </>      
  );
}


export default App;
