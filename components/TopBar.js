import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons'

export default function TopBar({ navigation }) {


  const [color, setColor] = useState({
    true: '#F06795',
    false: '#5c5c5c'
  })

  const [colorHome, setHome] = useState({
    true: '#F06795',
    false: '#5c5c5c'
  })
  const [colorChat, setChat] = useState({
    true: '#F06795',
    false: '#5c5c5c'
  })
  const [colorProfile, setProfile] = useState({
    true: '#F06795',
    false: '#5c5c5c'
  })

  const navigateHome = () => {
    navigation.navigate('Home')
    setHome(colorHome)
  }
  
  const navigateChat = () => {
    navigation.navigate('Chat')
    setChat(colorChat)
  }

  const navigateProfile = () => {
    navigation.navigate('Profile')
    setProfile(colorProfile)
  }

  return (
    <View style={styles.container}>
       <TouchableOpacity onPress={navigateHome}>
          <FontAwesome5 name="fire" size={27} color={color.true} />  
       </TouchableOpacity>
       <TouchableOpacity onPress={navigateChat}>
       <FontAwesome name="comments" size={27} color={color.false} />
          </TouchableOpacity>
       <TouchableOpacity onPress={navigateProfile}>
          <FontAwesome name="user" size={27} color={color.false} />
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