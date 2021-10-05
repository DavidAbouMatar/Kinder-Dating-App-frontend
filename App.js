import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/homeScreen';
import ProfileScreen from './screens/profileScreen';
import RegisterScreen from './screens/registerScreen';
import LoginScreen from './screens/loginScreen';
import ChatScreen from './screens/chatScreen';
import WelcomeScreen from './screens/welcomeScreen';

const screens = {
  
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="Welcome"
      screenOptions={{
      headerShown: false
  }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        {/* <Stack.Screen name="Login" comsponent={LoginScreen} /> */}
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    marginTop: 24
  }
});