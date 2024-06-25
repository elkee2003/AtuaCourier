import { View, Text, useWindowDimensions, PermissionsAndroid, Platform, Pressable, ActivityIndicator } from 'react-native'
import React, {useState, useEffect, useRef,} from 'react'
import Geolocation from '@react-native-community/geolocation';
import styles from './styles';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions';
import Entypo from "react-native-vector-icons/Entypo"
import { useNavigation } from '@react-navigation/native';

import BottomContainer from '../../components/BottomContainer';
import OrderDetails from '../OrderDetails';
import { orders } from '../../assets/data/orders';

navigator.geolocation = require('@react-native-community/geolocation');
const GOOGLE_MAPS_APIKEY = 'AIzaSyADZ3-4KsXIvtIzbN_pqUEPq14npw6XnHY';

const order = orders[0]

const ORDER_STATUSES ={
  READY_FOR_PICKUP:'Ready For Pickup',
  ACCEPTED:'Accepted',
  PICKEDUP: 'Picked Up',
  DELIVERED:'Delivered'
}

const OrderDeliveryMap = () => {
  // useState hooks
  const {width, height} = useWindowDimensions()
  const [isOnline, setIsOnline]= useState(true)
  const [myPosition, setMyPosition] = useState(null)
  const [totalMins, setTotalMins]=useState(0);
  const [totalKm, setTotalKm]=useState(0);
  const [avaliableOrders, setAvaliableOrders]= useState (orders)
  const [deliveryStatus, setDeliveryStatus]= useState(ORDER_STATUSES.READY_FOR_PICKUP)
  const [showOrderDetails, setShowOrderDetails]= useState(false)
  const [isCourierclose, setIsCourierClose]= useState(false)
  const [isPickedUp, setIsPickedUp]= useState(false)

  const mapRef = useRef(null)
  const navigation = useNavigation()

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

    // I might have to clean up the function. So I will have to look at it later so it won't give an error
    const foregroundSubscription = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMyPosition({ latitude, longitude });
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 100,
      }
    );

  }, []);

  if (!myPosition){
    return <ActivityIndicator size={"large"}/>
  }

  // Refferenced functions below
  const onGoPress = () => {
    setIsOnline(!isOnline)
  }

  // Function to Change the Latitude and Longitude of MapDirection
  const getDestination=()=>{
    if (isPickedUp){
      return{
        latitude:order.User.destLat,
        longitude:order.User.destLng,
      }
    }return{
      latitude:order.User.originLat,
      longitude:order.User.originLng,
    }
  }

  // Functions to Putup/ Remove OrderDetails Screen
  const changeShowOrderDetailsToTrue = ()=>{
    setShowOrderDetails(true)
  }
  const changeShowOrderDetailsToFalse = ()=>{
    setShowOrderDetails(false)
  }

  // Function of the Button on OrderDetails Screen when pressed
  const onButtonPressed = ()=>{
    if(deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP){
      setShowOrderDetails(false)
      mapRef.current.animateToRegion({
        latitude: myPosition.latitude,
        longitude:myPosition.longitude,
        latitudeDelta:0.01,
        longitudeDelta:0.01
      })
      setDeliveryStatus(ORDER_STATUSES.ACCEPTED)
    }

    if(deliveryStatus === ORDER_STATUSES.ACCEPTED){
      setShowOrderDetails(false)
      mapRef.current.animateToRegion({
        latitude: myPosition.latitude,
        longitude:myPosition.longitude,
        latitudeDelta:0.01,
        longitudeDelta:0.01
      })
      setDeliveryStatus(ORDER_STATUSES.PICKEDUP)
      setIsPickedUp(true)
    }
    if(deliveryStatus === ORDER_STATUSES.PICKEDUP && isPickedUp){
      setShowOrderDetails(false)
      mapRef.current.animateToRegion({
        latitude: myPosition.latitude,
        longitude:myPosition.longitude,
        latitudeDelta:0.01,
        longitudeDelta:0.01
      })
      setDeliveryStatus(ORDER_STATUSES.DELIVERED)
      navigation.navigate('Home')
    }
  }

  // Function for Rendering button name in OrderDetails Screen
  const renderButtonTitle = ()=>{
    if (deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP){
      return 'Accept Order'
    }
    if (deliveryStatus === ORDER_STATUSES.ACCEPTED){
      return 'Picked Up Order'
    }
    if (deliveryStatus === ORDER_STATUSES.PICKEDUP){
      return 'Delivered!'
    }
  }

  // Function for Disabling the Button in OrderDetails Screen
  const isButtonDisabled =()=>{
    if (deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP){
      return false;
    }
    if (deliveryStatus === ORDER_STATUSES.ACCEPTED && isCourierclose){
      return false;
    }
    if (deliveryStatus === ORDER_STATUSES.PICKEDUP && isCourierclose){
      return false;
    }
    return true;
  }

  // Function to show in BottomComponent and Order Details Screen
  const deliveryAccepted = deliveryStatus === ORDER_STATUSES.ACCEPTED
  const deliveryPickedUp = deliveryStatus === ORDER_STATUSES.PICKEDUP

  return (
    <View style={{position:'relative'}}>
      <MapView
        ref={mapRef}
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


        <MapViewDirections
        key={order.id}
        origin={myPosition}
        destination={getDestination()}
        apikey={GOOGLE_MAPS_APIKEY}
        timePrecision='now'
        strokeWidth={4}
        strokeColor= 'red'
        onReady={(result)=>{
          setIsCourierClose(result.distance <= 0.1)
          setTotalMins(result.duration)
          setTotalKm(result.distance)
        }}
        />

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
            <Entypo name={'location-pin'} color={'white'} size={24}/>
            </View>
          </Marker>
          )
        })}

      </MapView>

      {/* Four buttons at the 4 corners */}


      {/* Money Balance */}
      <View style={styles.balance}>
        <Text style={styles.balanceText}>
          <Text style={{color:'green'}}>₦</Text>
          {" "}
          0.00
        </Text>
      </View>


      {/* Go/End button */}
      {/* {isOnline ?
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
      }   */}

      {/* Bottom Container */}
      <BottomContainer
      isOnline={isOnline}
      order={order}
      totalKm={totalKm}
      totalMins={totalMins}
      changeShowOrderDetailsToTrue={changeShowOrderDetailsToTrue}
      deliveryAccepted={deliveryAccepted}
      deliveryPickedUp={deliveryPickedUp}
      />

      {showOrderDetails && <OrderDetails 
      onButtonPressed={onButtonPressed}
      changeShowOrderDetailsToFalse={changeShowOrderDetailsToFalse}
      isButtonDisabled={isButtonDisabled}
      renderButtonTitle={renderButtonTitle}
      deliveryPickedUp={deliveryPickedUp}
      />}

    </View>
  )
}

export default OrderDeliveryMap;