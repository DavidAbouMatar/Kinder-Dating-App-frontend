import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons'

export default function TopBar({ navigation }) {
  const [color, setColor] = useState({
    active: '#F06795',
    disabled: '#5c5c5c'
  })

  const navigateHome = () => {
    navigation.navigate('Home')
    color.active
  }
  
  const navigateChat = () => {
    navigation.navigate('Chat')
    color.disabled
  }

  const navigateProfile = () => {
    navigation.navigate('Profile')
    color.disabled
  }

  return (
    <View style={styles.container}>
       <TouchableOpacity onPress={navigateHome}>
          <FontAwesome5 name="fire" size={27} color={color.active} />  
       </TouchableOpacity>
       <TouchableOpacity onPress={navigateChat}>
       <FontAwesome name="comments" size={27} color={color.disabled} />
          </TouchableOpacity>
       <TouchableOpacity onPress={navigateProfile}>
          <FontAwesome name="user" size={27} color={color.disabled} />
       </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
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