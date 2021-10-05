import React from "react";
import { Button, View, Text, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Sign-in Screen</Text>
            <Button title="Go to Home" onPress={navigation.navigate('Home')} />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    }
});