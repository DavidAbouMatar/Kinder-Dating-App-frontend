import React from "react";
import { Button, View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants'
import TopBar from '../components/TopBar'

export default function ChatScreen({ navigation }) {
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