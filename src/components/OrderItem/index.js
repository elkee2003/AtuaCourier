import { View, Text, Pressable, ScrollView } from 'react-native'
import React from 'react'
import styles from './styles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'

const OrderItem = ({order, onAccept, onRemoveOrder}) => {

    const navigation = useNavigation()

    const goToOrderDelivery = ()=>{
        navigation.navigate("OrderDeliveryMap", {id: order.id})
    }


  return (

        <View style={styles.orderContainer}>
            <View style={styles.detailsContainer}>
                <Text style={styles.txt}>
                    Delivery Details:
                </Text>
                <ScrollView  style={styles.details}>
                    <Text style={styles.txt}>Name:{" "}</Text>   
                    <Text style={styles.txt}>{order.User.name}</Text> 
                </ScrollView>
                <ScrollView style={styles.details}>
                    <Text style={styles.txt}>Address:{" "}</Text>
                    <Text style={styles.txt}>{order.User.address}</Text> 
                </ScrollView>
            </View>

            <Pressable  onPress={goToOrderDelivery} style={styles.thumbsUp}>
                <FontAwesome 
                name={'thumbs-up'} 
                size={30} color={'white'}/>    
            </Pressable>
            <Pressable  onPress={()=> onRemoveOrder(order.User.id)} style={styles.thumbsDown}>
                <FontAwesome 
                name={'thumbs-down'} 
                size={30} color={'white'}/>    
            </Pressable>
            
        </View>
  )
}

export default OrderItem;