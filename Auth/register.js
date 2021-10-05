import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  onPress,
  TouchableOpacity,
} from "react-native";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// npm i @react-native-picker/picker
import { Picker } from "@react-native-picker/picker";


 
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
  const [height, setHight] = useState("");
  const [weight, setWeight] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [nationality, setNationality] = useState("");
  const [bio, setBio] = useState("");


  async function Register(){
    let date = dob.toISOString().slice(0,10);
 
    if(email != "" && password !=""){
      console.log('succcess')
    const data = {  
      email: email,
      password: password,
      first_name:name,
      last_name: lastName,
      gender: gender,
      interested_in: intrest,
      dob: date,
      height:height, 
      weight:weight,
      nationality:nationality,
      net_worth:networth,
      currency:curency,
      bio:bio,
      password:password,
      password_confirmation:conPassword

   };
    const headers = { 
      "Content-Type": "application/json",
      "content-Type": "application/json",
       
    }
    await fetch("http://127.0.0.1:8000/api/auth/register", {
    method: "POST",
    headers: headers,
    body:  JSON.stringify(data)
    }).then((response) => response.json())
    .then((responseData) => {
        if(responseData['status'] == true){
     
          login()
          
        }

     }).catch(error => console.log(error) )}
    }

  async function login(){
    if(email != "" && password !=""){

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
      AsyncStorage.setItem("isSignedIn", true);

    

     }).catch(error => console.log(error) )}
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
          onChangeText={(name) => setName(name)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Last name"
          placeholderTextColor="#003f5c"
          onChangeText={(lastName) => setLastName(lastName)}
        />
      </View>
      <View style={styles.inputView}>
      <TextInput
          style={styles.TextInput}
          placeholder="Nationality"
          placeholderTextColor="#003f5c"
          onChangeText={(nationality) => setNationality(nationality)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Weight in (KG)"
          placeholderTextColor="#003f5c"
          onChangeText={(Weight) => setWeight(Weight)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Height in (CM)"
          placeholderTextColor="#003f5c"
          onChangeText={(height) => setHight(height)}
        />
      </View>

      <View style={styles.inputView}>
      <TextInput
          style={styles.TextInput}
          placeholder="Networth"
          placeholderTextColor="#003f5c"
          onChangeText={(worth) => setNetworth(worth)}
        />
      </View>
      <Picker 
        selectedValue={curency}
        onValueChange={(curency, index) => setCurency(curency)}
        mode="dropdown" // Android only
        style={styles.picker}
      >
        <Picker.Item label="select your currency" value="" />
        <Picker.Item label="USD" value="0" />
        <Picker.Item label="LPB" value="1" />
     
      
      </Picker>


      <DatePicker  dateFormat="yyyy-mm-dd" selected={dob} onChange={(date) => setdob(date)} />

    <Picker 
        selectedValue={gender}
        onValueChange={(gender, index) => setGender(gender)}
        mode="dropdown" // Android only
        style={styles.picker}
      >
        <Picker.Item label="select your gender" value="" />
        <Picker.Item label="Male" value="0" />
        <Picker.Item label="Female" value="1" />
        <Picker.Item label="Other" value="2" />
      
      </Picker>

      <Picker 
        selectedValue={intrest}
        onValueChange={(intrest, index) => setIntrest(intrest)}
        mode="dropdown" // Android only
        style={styles.picker}
      >
        <Picker.Item label="select your Intrest" value="" />
        <Picker.Item label="Male" value="0" />
        <Picker.Item label="Female" value="1" />
    
      
      </Picker>
   
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <TextInput

        style={styles.TextInput}
        placeholder="Tell us about yorself."
        placeholderTextColor="#003f5c"
        multiline={true}
        numberOfLines={4}
        onChangeText={(bio) => setBio(bio)}/>
    
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(conPass) => setConPassword(conPass)}
        />
      </View>
 
      <TouchableOpacity onPress={register}   >
                    <Text>Register</Text>
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
  picker: {
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