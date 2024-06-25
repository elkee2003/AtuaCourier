import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import OrderScreen from '../screens/OrderScreen';
import OrderDetails from '../screens/OrderDetails';
import OrderDeliveryMap from '../screens/OrderDeliveryMap';
const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{
                headerShown:false,
            }}>
            <Stack.Screen name='Home' component={HomeScreen}/>
            <Stack.Screen name='OrderScreen' component={OrderScreen}/>
            <Stack.Screen name='OrderDetails' component={OrderDetails}/>
            <Stack.Screen name='OrderDeliveryMap' component={OrderDeliveryMap}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default HomeNavigator