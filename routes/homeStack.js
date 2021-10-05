import * as React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/homeScreen';
import ProfileScreen from '../screens/profileScreen';
import RegisterScreen from '../screens/registerScreen';
import LoginScreen from '../screens/loginScreen';
import ChatScreen from '../screens/chatScreen';
import WelcomeScreen from '../screens/welcomeScreen';


const screens = {
    Welcome: {
      screen: WelcomeScreen,
      navigationOptions: {
        title: 'Welcome',
      },
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Home',
      },
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        title: 'Register',
      },
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        title: 'Login',
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'Profile',
      },
    },
    Chat: {
      screen: ChatScreen,
      navigationOptions: {
        title: 'Chat',
      },
    },
  }

  
  
  const Stack = createStackNavigator(screens);

  export default createAppContainer(Stack);