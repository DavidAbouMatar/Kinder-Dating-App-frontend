import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const [color, setColor] = useState()

function navigateProfile({ navigation }) {
  
}

export default function TopBar({ navigation }) {
  return (
    <View style={styles.container}>
       <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <FontAwesome5 name="fire" size={27} color="#F06795" />  
       </TouchableOpacity>
       <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
       <FontAwesome name="comments" size={27} color="#5c5c5c" />
          </TouchableOpacity>
       <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <FontAwesome name="user" size={27} color="#5c5c5c" />
       </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5.46,
    elevation: 9,
  },
})