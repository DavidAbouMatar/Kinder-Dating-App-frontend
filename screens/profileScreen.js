import * as React from 'react';
import Constants from 'expo-constants'
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TopBar from '../components/TopBar'


export default function ProfileScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <TopBar navigation={navigation}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
});