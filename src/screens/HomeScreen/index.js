import { View, Text, useWindowDimensions, PermissionsAndroid, Platform, Pressable, ActivityIndicator } from 'react-native'
import React, {useState, useEffect,} from 'react'
import Geolocation from '@react-native-community/geolocation';
import styles from './styles';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions';
import Entypo from "react-native-vector-icons/Entypo"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import BottomContainer from '../../components/BottomContainer';
import { orders } from '../../assets/data/orders';

const GOOGLE_MAPS_APIKEY = 'AIzaSyADZ3-4KsXIvtIzbN_pqUEPq14npw6XnHY';

navigator.geolocation = require('@react-native-community/geolocation');

const HomeScreen = () => {
  // useState hooks
  const {width, height} = useWindowDimensions()
  const [isOnline, setIsOnline]= useState(false)
  const [myPosition, setMyPosition] = useState(null)
  const [avaliableOrders, setAvaliableOrders]= useState (orders)

  // useEffect Hook for Location
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Atua Location Request',
            message: 'Atua needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.DENIED) {
          console.log('Location permission denied');
          return;
        }
      }

      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position)
          setMyPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    };

    requestLocationPermission();
  }, []);

  if (!myPosition){
    return <ActivityIndicator size={"large"}/>
  }

  // Refferenced functions
  const onGoPress = () => {
    setIsOnline(!isOnline)
  }


  return (
    <View style={{position:'relative'}}>
      {myPosition ? <MapView
        style={{width, height:height - 150}}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        initialRegion={{
          latitude: myPosition.latitude,
          longitude: myPosition.longitude,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0121,
        }}
      >

        {avaliableOrders.map((order)=>{
            return(
            <MapViewDirections
            key={order.id}
            origin={myPosition}
            destination={{
                latitude: order.User.originLat,
                longitude: order.User.originLng
            }}
            apikey={GOOGLE_MAPS_APIKEY}
            timePrecision='now'
            strokeWidth={4}
            strokeColor="red"
            />
            )
        })}

        {avaliableOrders.map((order)=>{
          return(
          <Marker 
          key={order.id}
          title={order.User.name} 
          discription={order.User.address} 
          coordinate={{
            latitude:order.User.originLat,
            longitude:order.User.originLng,
          }}>
            <View style={{backgroundColor:'#6ff302', padding:5, borderRadius:20}}>
            <Entypo name={'location-pin'} color={'red'} size={24}/>
            </View>
          </Marker>
          )
        })}

      </MapView> 
      : 
      <Text>Loading...</Text>
      }

      {/* Four buttons at the 4 corners */}
      <Pressable onPress={()=>console.warn('Menu')} style={[styles.roundButton, {top:10, left:10}]}>
        <Entypo name={"menu"} size={24} color={"#4a4a4a"}/>
      </Pressable>

      <Pressable onPress={()=>console.warn('Shield')} style={[styles.roundButton, {bottom:130, left:10}]}>
        <FontAwesome name={"shield"} size={24} color={'#0640ff'}/>
      </Pressable>

      <Pressable onPress={()=>console.warn('Search')} style={[styles.roundButton, {top:10, right: 55}]}>
        <FontAwesome name={"search"} size={24} color={"#4a4a4a"}/>
      </Pressable>

      <Pressable onPress={()=>console.warn('Message')} style={[styles.roundButton, {bottom:130, right:10}]}>
        <MaterialCommunityIcons name={"message"} size={24} color={"#0f0e0e"}/>
      </Pressable>


      {/* Money Balance */}
      <View style={styles.balance}>
        <Text style={styles.balanceText}>
          <Text style={{color:'green'}}>₦</Text>
          {" "}
          0.00
        </Text>
      </View>


      {/* Go/End button */}
      {isOnline ?
        <Pressable onPress={onGoPress} style={styles.endButton}>
          <Text style={styles.endButtonText}>
            END
          </Text>
        </Pressable>
        :
        <Pressable onPress={onGoPress} style={styles.goButton}>
          <Text style={styles.goButtonText}>
            GO
          </Text>
        </Pressable>
      }  

      {/* Bottom Container */}
      <BottomContainer
      isOnline={isOnline}/>
    </View>
  )
}

export default HomeScreen;