import AsyncStorage from "@react-native-async-storage/async-storage";
import {StatusBar} from "expo-status-bar";
import React, {useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  onPress,
  TouchableOpacity,
  Alert
} from "react-native";

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //send  login data
  async function login() {
    if (email != "" && password != "") {
      const data = {email: email, password: password};
      const headers = {
        "Content-Type": "application/json",
        "content-Type": "application/json",
      };
      await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      })
        .then((response) => response.json())

        .then((responseData) => {
          // retrieve token using AsyncStorage.getItem('token')
          AsyncStorage.setItem("token", responseData["token"]);
          AsyncStorage.setItem("ID", responseData["id"]);
          AsyncStorage.setItem("first_name", responseData["first_name"]);
          AsyncStorage.setItem("last_name", responseData["last_name"]);
          AsyncStorage.setItem("isSignedIn", true);
        })
        .catch(error = () => {
          console.log(error);
          AsyncStorage.setItem("isSignedIn", false);
        });
    }
  }


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Weclome back!</Text>
      </View>

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

      <View style={styles.button}>
        <Button onPress={login} title="Sign in" color="#F06795"></Button>
      </View>

      <View>
        <View>
          <Text style={styles.register}>You don't have an account yet?</Text>
        </View>
        <View>
          <Button
            title="Create Acount"
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    fontSize: 30,
    alignSelf: "center",
    paddingTop: 20,
    paddingBottom: 50,
  },
  inputView: {
    backgroundColor: "#fff",
    borderRadius: 5,
    width: "100%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  button: {
    backgroundColor: "#F06795",
    borderRadius: 5,
    width: "100%",
    margin: "10%",
  },
  register: {
    fontSize:20,
    alignSelf:"center",
    paddingTop: 20,
    paddingBottom: 10
  }
});
