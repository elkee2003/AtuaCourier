import { View, Text, FlatList,ScrollView } from 'react-native'
import React, { useState } from 'react'
import { orders } from '../../assets/data/orders'
import OrderItem from '../../components/OrderItem'
import styles from './styles'

const OrderScreen = () => {
  
  const [avaliableOrders, setAvaliableOrders] = useState(orders)

  const onRemoveOrder = (id)=>{
    const filteredOrder = avaliableOrders.filter((order)=> order.id !== id)
    setAvaliableOrders(filteredOrder)
  }

  // const onAccept= (id)=>{
  //   const acceptedOrder = avaliableOrders.filter((order)=>{ order.id === id})
  //   setMyOrder(acceptedOrder)
  // }
  // Kindly note there is no useState of myOrder and setMyOrder

  return (
    <View style={styles.container}>
        <View style={styles.notification}>
            <Text style={styles.tNotification}>You have: {""}
            </Text>
            <Text style={[styles.tNotification, {color:'#ff0800',}]}>{avaliableOrders.length} {""}</Text>
            <Text style={styles.tNotification}>Pending Orders</Text>
        </View>
        
      <ScrollView>
        {avaliableOrders.map((order)=>{
          return(
            <OrderItem 
            key={order.id} 
            order={order}
            onRemoveOrder={onRemoveOrder}
            />
          )
        })}
    
        {/* <FlatList 
        data={orders}
        renderItem={({item})=><OrderItem order={item} onAccept={onAccept} onRemoveOrder={onRemoveOrder}/>}
        /> */}
      </ScrollView>
    </View>
  )
}

export default OrderScreen