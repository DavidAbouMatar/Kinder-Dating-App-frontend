import * as React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import Constants from 'expo-constants'
import { Button,
     View,
      Text,
      TouchableOpacity,
      ImageBackground,
      TextInput,
       StyleSheet,
    
useTheme} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import TopBar from '../components/TopBar';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ProfileScreen({ navigation }) {
  const [ttoken, setToken] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [intrest, setIntrest] = useState("");
  const [networth, setNetworth] = useState("");
  const [curency, setCurency] = useState("");
  const [dob, setdob] = useState(new Date());
  const [email, setEmail] = useState("");
  const [height, setHight] = useState("");
  const [weight, setWeight] = useState("");
  const [nationality, setNationality] = useState("");
  const [bio, setBio] = useState("");
  const [updateGender, setUpdateGender] = useState("");
  const [updateintrest, setupdateintrest] = useState("");
 
  const [profileImage, setProfileImage] = useState("https://kittyinpink.co.uk/wp-content/uploads/2016/12/facebook-default-photo-male_1-1.jpg");

 




  useEffect(() => {
   
    // get auth token
    AsyncStorage.getItem("token").then((value) => {
    
      setToken(value)


    fetch("http://127.0.0.1:8000/api/get_user_profile", {
      method: 'GET',
      headers: new Headers({"Content-Type": "application/json",
      "content-Type": "application/json",
      "Authorization":"Bearer "+ value
       }),}
    )
    .then(response => response.json())
    .then((responseData) => {
      setName(responseData[0]['first_name'])
      setLastName(responseData[0]['last_name'])
      setNationality(responseData[0]['nationality'])
      setdob(responseData[0]['dob'])
      setHight(responseData[0]['height'])
      setWeight(responseData[0]['weight'])
      setEmail(responseData[0]['email'])
      setNetworth(responseData[0]['net_worth'])
      setCurency(responseData[0]['currency'])
      setBio(responseData[0]['bio'])
      setUpdateGender(responseData[0]['gender'])
      setupdateintrest(responseData[0]['interested_in'])
      if(responseData[0]['gender']==0){
        setGender('Male')
      }else{
        setGender('Female')
      }
      if(responseData[0]['interested_in']==0){
        setIntrest('Male')
      }else{
        setIntrest('Female')
      }
      
        
      })


      fetch("http://127.0.0.1:8000/api/get_user_profile_image", {
      method: 'GET',
      headers: new Headers({"Content-Type": "application/json",
      "content-Type": "application/json",
      "Authorization":"Bearer "+ value
       }),}
    ).then(response => response.json())
    .then((data) => {
      if(data){
      setProfileImage(data['picture_url']) 
    }
    })
  })
  },[])


    async function takeAndUploadPhotoAsync() {
     
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
          base64: true,
        });
      
        if (result.cancelled) {
          return;
        }
      //base64 image
        let base_64 = result.base64
        console.log("uri",base_64)
        //upload image
        return await fetch("http://127.0.0.1:8000/api/upload_image",{

          headers: {
            "Content-Type":"application/json",
            "Accept":"application/jason",
             "Authorization":"Bearer "+ ttoken
              },
          method: 'POST',
          body: JSON.stringify({ "image_string": base_64}),
         }
     
        );
        // this.bs.current.snapTo(1)
      }

      async function edit_profile(){
       
        if(gender == 'Male'){
          setUpdateGender(0)
        }else{
          setUpdateGender(1)
        }
        if(intrest == "Male"){
          setupdateintrest(0)
        }else{
          setupdateintrest(1)
        }
        console.log(updateintrest)
        const data = {  
       
          first_name:name,
          last_name: lastName,
          gender: updateGender,
          interested_in: updateintrest,
          dob:dob,
          height:height, 
          weight:weight,
          nationality:nationality,
          net_worth:networth,
          currency:curency,
          bio:bio,
    
       };
        const headers = { 
          "Content-Type": "application/json",
          "Authorization":"Bearer "+ ttoken
        }
        await fetch("http://127.0.0.1:8000/api/edit_profile", {
        method: "POST",
        headers: headers,
        body:  JSON.stringify(data)
        }).then((response) => response.json())
     
        }
        

      
      
     let  renderInner = () => (
        <View style={styles.panel}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.panelTitle}>Upload Photo</Text>
            <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
          </View>
       
          <TouchableOpacity style={styles.panelButton} onPress={takeAndUploadPhotoAsync}>
            <Text style={styles.panelButtonTitle}>Choose From gallary</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={() => bs.current.snapTo(1)}>
            <Text style={styles.panelButtonTitle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      );
    
    let renderHeader = () => (
        <View style={styles.header}>
          <View style={styles.panelHeader}>
            <View style={styles.panelHandle} />
          </View>
        </View>
      );
    
      const bs = React.createRef();
    //   bs = React.createRef();
      const fall = new Animated.Value(1);

     
    return (
        <View style={styles.container}>
            <TopBar navigation={navigation}/>
            <View style={{ margin: 20}}>
            <BottomSheet
                    ref={bs}
                    snapPoints={[330, 0]}
                    renderContent={renderInner}
                    renderHeader={renderHeader}
                    initialSnap={1}
                    callbackNode={fall}
                    enabledGestureInteraction={true}
                />
                <Animated.View style={{margin: 20,
                    opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
                }}>
                 
                
                <View style={{ alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                    <View style={{
                        height: 100,
                        width: 100,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                       

                    <ImageBackground
                        source={{uri: profileImage}}
                        style={{flex: 1,height:100, width: 100}}
                        imageStyle={{borderRadius:15}}
                        >
                        <View >
                        <FontAwesome name="camera" size={24} color="white"style={{
                            opacity: 0.7,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingLeft:5,
                            paddingTop:1,
                        
                           
                        }}
                         />
                        </View>
                        </ImageBackground>

                    </View>
                    </TouchableOpacity>
                    <Text style={{marginTop:10,
                    fontSize: 18,
                
                    fontWeight: 'bold'}}> {name} {lastName} </Text>

                </View>
                <View style={styles.action}>
                    <FontAwesome name="user" size={24} color="black" />
                        <TextInput 
                        placeholder="First Name"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        value={name}
                        onChangeText={(name) => setName(name)}
                        /> 
                        </View>
                    <View style={styles.action}>
                        <FontAwesome name="user" size={24} color="black" />
                        <TextInput 
                        placeholder="Last Name"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        value={lastName}
                        onChangeText={(lastName) => setLastName(lastName)}
                        /> 
                        </View>

                        <View style={styles.action}>
                        <MaterialCommunityIcons name="gender-male-female" size={24} color="black" />
                        <TextInput 
                        placeholder="gender"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        value={gender}
                        onChangeText={(gender) => setGender(gender)}
                        /> 
                        </View>

                        <View style={styles.action}>
                        <MaterialCommunityIcons name="gender-male-female" size={24} color="black" />
                        <TextInput 
                        placeholder="Intrested in"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        value={intrest}
                        onChangeText={(intrest) => setIntrest(intres)}
                        /> 
                        </View>

                        <View style={styles.action}>
                        <Entypo name="email" size={24} color="black" />
                        <TextInput 
                        value={email}
                        placeholder="email"
                        placeholderTextColor="#666666"
                        editable={false}
                        style={styles.textInput}
                        onChangeText={(email) => setEmail(email)}
                        /> 
                        </View>

                        <View style={styles.action}>
                        <MaterialCommunityIcons name="human-male-height-variant" size={24} color="black" />
                        <TextInput 
                        placeholder="Heigth"
                        keyboardType="number-pad"
                        placeholderTextColor="#666666"
                        value={height}
                        style={styles.textInput}
                        onChangeText={(height) => setHight(height)}
                        /> 
                        </View>

                        <View style={styles.action}>
                        <MaterialCommunityIcons name="weight-kilogram" size={24} color="black" />
                        <TextInput 
                        placeholder="Weight"
                        keyboardType="number-pad"
                        placeholderTextColor="#666666"
                        value={weight}
                        style={styles.textInput}
                        onChangeText={(weight) => setWeight(weight)}
                        /> 
                        </View>

                        <View style={styles.action}>
                        <Ionicons name="ios-earth-sharp" size={24} color="black" />
                        <TextInput 
                        placeholder="Nationality"
                        placeholderTextColor="#666666"
                        value={nationality}
                        style={styles.textInput}
                        onChangeText={(nationality) => setNationality(nationality)}
                        /> 
                        </View>

                    <TouchableOpacity style={styles.commandButton} onPress={edit_profile}>
                        <Text style={styles.panelButtonTitle}>Save</Text>
                    </TouchableOpacity>
                  
                    </Animated.View>
                   
            </View>
           
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#F06795',
        alignItems: 'center',
        marginTop: 10,
      },
      panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,

      },
      header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      panelHeader: {
        alignItems: 'center',
      },
      panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
      },
      panelTitle: {
        fontSize: 27,
        height: 35,
      },
      panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
      },
      panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#F06795',
        alignItems: 'center',
        marginVertical: 7,
      },
      panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
      },
      action: {
        flexDirection: 'row',
        marginTop: 7,
        // marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
      },
      actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
      },
      textInput: {
        flex: 1,
        // marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
      },
});