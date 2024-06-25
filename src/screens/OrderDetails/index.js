import { View, Text, Pressable,ScrollView } from 'react-native'
import React from 'react'
import styles from './styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { orders } from '../../assets/data/orders'


const order = orders[0]

const OrderDetails = ({
  onButtonPressed, 
  changeShowOrderDetailsToFalse,
  isButtonDisabled,
  renderButtonTitle,
  deliveryPickedUp}) => {

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Contact Details</Text>
      </View>
      <ScrollView style={styles.dContainer}>

        <View style={styles.senderDetails}>
          <View style={styles.details}>
              <View style={styles.icon}>
              <FontAwesome name={'user'} size={40} color={'#021d46'}/>
            </View>
            <Text style={styles.tDetails}>
              {order.User.name}
            </Text>
          </View>
          <View style={styles.details}>
            <View style={styles.icon}>
              <Ionicons name={'call'} size={40} color={'#021d46'}/>
            </View>
            <Text style={styles.tDetails}>
              {order.User.phoneNumber}
            </Text>
          </View>
          <View style={styles.details}>
            <View style={styles.icon}>
              <Entypo name={'location'} size={40} color={'#021d46'}/>
            </View>
            <Text style={styles.tDetails}>
              {order.User.address}
            </Text>
          </View>
          <View style={styles.details}>
            <View style={styles.icon}>
              <Entypo name={'time-slot'} size={40} color={'#021d46'}/>
            </View>
            <Text style={styles.tDetails}>
              30 min
            </Text>
          </View>
          <View style={styles.details}>
            <View style={styles.icon}>
              <MaterialCommunityIcons name={'map-marker-distance'} size={40} color={'#021d46'}/>
            </View>
            <Text style={styles.tDetails}>
              2 km
            </Text>
          </View>
        </View>
        {deliveryPickedUp && <View style={styles.recipientDetails}>
          <Text style={styles.recipientHeader}>Recipient Details:</Text>
          <View style={styles.details}>
              <View style={styles.rIcon}>
              <FontAwesome name={'user'} size={40} color={'#021d46'}/>
            </View>
            <Text style={styles.tDetails}>
              {order.Order.recipientName}
            </Text>
          </View>
          <View style={styles.details}>
            <View style={styles.rIcon}>
              <Ionicons name={'call'} size={40} color={'#021d46'}/>
            </View>
            <Text style={styles.tDetails}>
              {order.Order.recipientNumber}
            </Text>
          </View>
          <View style={styles.details}>
            <View style={styles.rIcon}>
              <Entypo name={'location'} size={40} color={'#021d46'}/>
            </View>
            <Text style={styles.tDetails}>
              {order.Order.recipientAddress}
            </Text>
          </View>
          <View style={styles.details}>
            <View style={styles.rIcon}>
              <MaterialIcons name={'details'} size={40} color={'#021d46'}/>
            </View>
            <ScrollView style={styles.detailsOfOrder}>
              <Text style={styles.tDetails}>
                {order.Order.detailsOfOrder}
              </Text>
            </ScrollView>
          </View>
        </View>}
        
      </ScrollView>

      <Pressable onPress={()=>changeShowOrderDetailsToFalse()} style={styles.bckBtn}>
            <Ionicons name={'arrow-back'} size={40} color={'white'}/>
        </Pressable>
      
      <Pressable onPress={onButtonPressed} 
      disabled={isButtonDisabled()}
      style={{...styles.acceptBtn, backgroundColor: isButtonDisabled() ? 'grey' : '#6bff08'}}>
        <Text style={styles.tBtn}>{renderButtonTitle()}</Text>
       </Pressable>
    </View>
  )
}

export default OrderDetails;