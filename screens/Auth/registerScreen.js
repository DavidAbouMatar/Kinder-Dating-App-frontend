import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    onPress,
    TouchableOpacity,
    Button,
} from "react-native";

export default function RegisterScreen({ navigation }) {
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

    async function Register() {
        let date = dob.toISOString().slice(0, 10);

        if (email != "" && password != "") {
            console.log("succcess");
            const data = {
                email: email,
                password: password,
                first_name: name,
                last_name: lastName,
                gender: gender,
                interested_in: intrest,
                dob: date,
                height: height,
                weight: weight,
                nationality: nationality,
                net_worth: networth,
                currency: curency,
                bio: bio,
                password: password,
                password_confirmation: conPassword,
            };

            const headers = {
                "Content-Type": "application/json",
                "content-Type": "application/json",
            };

            await fetch("http://127.0.0.1:8000/api/auth/register", {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((responseData) => {
                    if (responseData["status"] == true) {
                        login();
                    }
                })
                .catch((error) => console.log(error));
        }
    }

    async function login() {
        if (email != "" && password != "") {
            const data = { email: email, password: password };
            const headers = {
                "Content-Type": "application/json",
                "content-Type": "application/json",
            };
            await fetch("http://127.0.0.1:8000/api/auth/login", {
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
                .catch((error) => console.log(error));
        }
    }
    
    return (
        <View style={styles.container}>
            {/* <Text>Already have an account?</Text>
            <Button title="Signin" onPress={() => navigation.navigate("Signin")} />
            <StatusBar style="auto" /> */}
            <View>
            <Text
                 style={styles.header}
                >Create a new account!</Text>
            </View>
            
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="First name"
                    placeholderTextColor="#000"
                    onChangeText={(name) => setName(name)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Last name"
                    placeholderTextColor="#000"
                    onChangeText={(lastName) => setLastName(lastName)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email."
                    placeholderTextColor="#000"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password."
                    placeholderTextColor="#000"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Confirm password."
                    placeholderTextColor="#000"
                    secureTextEntry={true}
                    onChangeText={(conPass) => setConPassword(conPass)}
                />
            </View>
            
            <View style={styles.dateContainer}>
                <View>
                <Text style={styles.dateText}>Date of birth</Text>
                </View>
                <DatePicker  
                    style={styles.date}
                    dateFormat="yyyy-MM-dd" 
                    selected={dob} 
                    onChange={(date) => setdob(date)} 
                />
            </View>

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
                    placeholder="Nationality"
                    placeholderTextColor="#000"
                    onChangeText={(nationality) => setNationality(nationality)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Weight in (KG)"
                    placeholderTextColor="#000"
                    onChangeText={(Weight) => setWeight(Weight)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Height in (CM)"
                    placeholderTextColor="#000"
                    onChangeText={(height) => setHight(height)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Networth"
                    placeholderTextColor="#000"
                    onChangeText={(worth) => setNetworth(worth)}
                />
            </View>
            <Picker
                style={styles.picker}
                selectedValue={curency}
                onValueChange={(curency, index) => setCurency(curency)}
                mode="dropdown" // Android only
            >
                <Picker.Item label="select your currency" value="" />
                <Picker.Item label="USD" value="0" />
                <Picker.Item label="LPB" value="1" />
            </Picker>
            

            

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Tell us about yorself."
                    placeholderTextColor="#000"
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(bio) => setBio(bio)}
                />
            </View>

            
            <View style={styles.button}>
                <Button
                    onPress={Register}
                    title='Register'
                    color='#F06795'
                >
                </Button>
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
        paddingRight: 20
    },
    header: {
        fontSize:30,
        alignSelf:"center",
        paddingTop: 20,
        paddingBottom: 50
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
    picker: {
        backgroundColor: "#fff",
        borderRadius: 5,
        width: '100%',
        height: 20,
        marginBottom: 20,
        alignItems: "center",
    },
    date: {
        backgroundColor: "#fff",
        borderRadius: 5,
        marginBottom: 20,
    },
    dateContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 20,
        width: '100%'
    },
    dateText: {
        marginRight: 10,
    },
    button: {
        backgroundColor: '#F06795',
        borderRadius: 5,
        width: '100%',
        margin: '10%'
    }
});
