import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Picker,
  onPress,
  TouchableOpacity,
} from "react-native";
import DatePicker from "react-datepicker";

 
export default function App() {

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [intrest, setIntrest] = useState("");
  const [networth, setNetworth] = useState("");
  const [curency, setCurency] = useState("");
  const [dob, setdob] = useState(new Date());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  async function handleClick(){
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
      this.navigation.navigate('home');
      // const keys = AsyncStorage.getItem('token')
      // const keyss = AsyncStorage.getItem('first_name')
      // console.log("keys",keyss)

     }).catch(error => console.log(error) )}
    // .then( (response) => { 
    //   var res = response.json();
    //   AsyncStorage.setItem("token", res['token']);
      
    //   const keys = AsyncStorage.getItem('token')
    //   console.log(res)
  //  })
  //  .catch(error => console.log(error) )
     

    }
  
 
    

  // handleClick = () => {
  //   console.log('hghg')
    // const article = { title: 'React POST Request Example', email: 'david@gmail.com',
    // password: '123456' };
    // const headers = { 
    //     'Authorization': 'Bearer my-token',
    //     'My-Custom-Header': 'foobar'
    // };
    // axios.post('http://127.0.0.1:8000/api/auth/login', article, { headers })
    //     .then(response => this.setState({ articleId: response.data.id })).catch(function (error) {
    //       throw error;
    //       console.log(error);
    //   });
    
// }
 
  return (
    <View style={styles.container}>
   
 
      <StatusBar style="auto" />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Name"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(name) => setName(name)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Last name"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(lastName) => setLastName(lastName)}
        />
      </View>

      <View style={styles.inputView}>
    
      </View>

      
      <DatePicker selected={dob} onChange={(date) => setdob(date)} />
      
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
 
      <TouchableOpacity onPress={handleClick}   >
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