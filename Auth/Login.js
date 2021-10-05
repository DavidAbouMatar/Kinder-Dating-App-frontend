import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  onPress,
  TouchableOpacity,
} from "react-native";

 
export default function Login() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //send  login data
  async function login(){
    if(email != "" && password !=""){
    console.log('hghg')
    const data = {  email: email,
    password: password };
    const headers = { 
      "Content-Type": "application/json",
      "content-Type": "application/json",
       
    }
    await fetch("http://127.0.0.1:8000/api/auth/login", {
    method: "POST",
    headers: headers,
    body:  JSON.stringify(data)

    }).then((response) => response.json())

    .then((responseData) => {
      // retrieve token using AsyncStorage.getItem('token')
      AsyncStorage.setItem("token", responseData['token']);
      AsyncStorage.setItem("ID", responseData['id']);
      AsyncStorage.setItem("first_name", responseData['first_name']);
      AsyncStorage.setItem("last_name", responseData['last_name']);

     }).catch(error => console.log(error) )} 

    }
  

 
  return (
    <View style={styles.container}>
   
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      <TouchableOpacity onPress={login}   >
                    <Text>Login</Text>
                </TouchableOpacity>
 

    </View>
  );
}

 
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 

 
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: 'blue',
  },
});