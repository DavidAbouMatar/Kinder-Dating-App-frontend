import React, { useState, useEffect, useRef } from 'react'
import { Button, View, Text, StyleSheet, Alert } from 'react-native'
import WelcomeTopBar from '../components/WelcomeTopBar'
import BottomBar from '../components/BottomBar'
import Swipes from '../components/Swipes'

export default function WelcomeScreen({ navigation }) {
  const [users, setUsers] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const swipesRef = useRef(null)

  async function fetchUsers() {
    const response = await fetch("https://randomuser.me/api/?gender=female&results=50")
    
    if (!response.ok) {
        const message = "ERROR OCCURED"
        Alert.alert('Error getting users', '', [{ text: 'Retry', onPress: () => fetchUsers() }])
        throw new Error(message)
    }
    const data = await response.json()
    setUsers(data.results)
  }
  
  console.log(users)
  useEffect(() => {
    fetchUsers()
  }, [])

  function handleLike() {
    console.log('like')
    nextUser()
  }

  function handlePass() {
    console.log('pass')
    nextUser()
  }

  function nextUser() {
    const nextIndex = users.length - 2 === currentIndex ? 0 : currentIndex + 1
    setCurrentIndex(nextIndex)
    // console.log('test')
  }

  function handleLikePress() {
    swipesRef.current.openLeft()
  }
  function handlePassPress() {
    swipesRef.current.openRight()
  }

  return (
    <View style={styles.container}>
      <WelcomeTopBar navigation={navigation}/>
      <View style={styles.swipes}>
        {users.length > 1 &&
          users.map(
            (u, i) =>
              currentIndex === i && (
                <Swipes
                  key={i}
                  ref={swipesRef}
                  currentIndex={currentIndex}
                  users={users}
                  handleLike={handleLike}
                  handlePass={handlePass}
                ></Swipes>
              )
          )}
      </View>
      <BottomBar handleLikePress={handleLikePress} handlePassPress={handlePassPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swipes: {
    flex: 1,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
})



















//     return (
//       <View style={styles.container}>
//         <Text>Home Screen</Text>
//         <Button
//           title="Go to Register"
//           onPress={() => navigation.navigate('Register')}
//         />
//         <Button
//           title="Go to Login"
//           onPress={() => navigation.navigate('Login')}
//         />
//         <Button
//           title="Go to Profile"
//           onPress={() => navigation.navigate('Profile')}
//         />
//         <Button
//           title="Go to Chat"
//           onPress={() => navigation.navigate('Chat')}
//         />
//       </View>
//     );


// const styles = StyleSheet.create({
//   container: {
//       flex: 1, 
//       alignItems: 'center', 
//       justifyContent: 'center'
//   }
// });
