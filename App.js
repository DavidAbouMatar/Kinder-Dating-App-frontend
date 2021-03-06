import React, { useState } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/homeScreen";
import ProfileScreen from "./screens/profileScreen";
import RegisterScreen from "./screens/Auth/registerScreen";
import SigninScreen from "./screens/Auth/signinScreen";
import ChatScreen from "./screens/chatScreen";
import WelcomeScreen from "./screens/welcomeScreen";

// https://reactnavigation.org/docs/auth-flow
// Authentication flow

const Stack = createNativeStackNavigator();

function App() {
  const [isSignedIn, setisSignedIn] = useState(false);
  return isSignedIn ? (
    // No token found, user isn't signed in
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    // User is signed in
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Kinder" component={WelcomeScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
});
