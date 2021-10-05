import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons'



// const [color, setColor] = useState()


export default function WelcomeTopBar({ navigation }) {

  const navigateHome = () => {
    // navigation.navigate('Home')
    navigation.getParam(setIsSignedIn(!isSignedIn))
    console.log(isSignedIn)
}

  return (
    <View style={styles.container}>
       <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
          <FontAwesome name="sign-in" size={27} color="black" style={styles.icon}/>  
          <Text style={styles.signin}>Sign-in</Text>
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
  button: {
    flex:1,
    flexDirection:'row',
    justifyContent: 'flex-end'
  }, 
  signin: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 5
  },
})