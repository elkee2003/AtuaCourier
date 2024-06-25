import { View, Text,Pressable } from 'react-native'
import React from 'react'
import styles from './styles'
import Entypo from "react-native-vector-icons/Entypo"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { useNavigation } from '@react-navigation/native'
import { orders } from '../../assets/data/orders'

const BottomContainer = ({order, isOnline, totalKm, totalMins, changeShowOrderDetailsToTrue, deliveryAccepted,deliveryPickedUp}) => {
  const navigation = useNavigation()

  const goToOrderScreen = ()=>{
    navigation.navigate('OrderScreen')
  }

  const goToOrderDetails =()=>{
    changeShowOrderDetailsToTrue()
  }

    const renderBottomStatus= ()=>{

      if(deliveryPickedUp){
        return (
          <Pressable onPress={goToOrderDetails}>
            <View style={{alignItems:'center'}}>
              <View style={styles.pickUpInfo}>
                  <Text style={styles.bottomText}>{totalMins.toFixed(0)} {""}min</Text>
                  <View style={styles.userBackground}>
                    <FontAwesome name={'user'} color={'white'} size={20}/>
                  </View>
                  <Text style={styles.bottomText}>{totalKm.toFixed(1)} km</Text>
              </View>           
              <Text style={styles.bottomTextStat}>Dropping Off Order of {order.User.name}</Text>
            </View>  
          </Pressable> 
         
        )
      }

      if(deliveryAccepted){
        return (
          <Pressable onPress={goToOrderDetails}>
            <View style={{alignItems:'center'}}>
              <View style={styles.pickUpInfo}>
                  <Text style={styles.bottomText}>{totalMins.toFixed(0)} {""}min</Text>
                  <View style={styles.userBackground}>
                    <FontAwesome name={'user'} color={'white'} size={20}/>
                  </View>
                  <Text style={styles.bottomText}>{totalKm.toFixed(1)} km</Text>
              </View>           
              <Text style={styles.bottomTextStat}>Picking Up Parcel of {order.User.name}</Text>
            </View>  
          </Pressable> 
        )
      }

        if(order){
          return (
            <Pressable onPress={goToOrderDetails}>
              <View style={{alignItems:'center'}}>
                <View style={styles.pickUpInfo}>
                    <Text style={styles.bottomText}>{totalMins.toFixed(0)} {""}min</Text>
                    <View style={styles.userBackground}>
                      <FontAwesome name={'user'} color={'white'} size={20}/>
                    </View>
                    <Text style={styles.bottomText}>{totalKm.toFixed(1)} km</Text>
                </View>           
                <Text style={styles.bottomTextStat}>Accept Order of {order.User.name}</Text>
              </View>  
            </Pressable>
            
          )
        }

        if(isOnline){
          return(
            <Pressable onPress={goToOrderScreen}>
              <Text style={styles.bottomText}>You're online</Text>
              <Text style={styles.pendingOrderText}>
                {orders.length}{" "}Pending Orders
              </Text>
            </Pressable>
          )
        }else{
          return <Text style={styles.bottomTextOff}>You're offline</Text>
        }
      }

  return (
    <View>
      <View style={isOnline ? {...styles.bottomContainer, backgroundColor:'#10c05f'} :styles.bottomContainer}>
        <Pressable onPress={()=>console.warn('sliders')}>
          <FontAwesome name={"sliders"} size={24} color={"#4a4a4a"}/>
        </Pressable>
        
        {renderBottomStatus()}
      
        <Pressable onPress={()=>console.warn('list')}>
          <Entypo name={"list"} size={24} color={"#4a4a4a"}/>
        </Pressable>
      </View>
    </View>
  )
}

export default BottomContainer