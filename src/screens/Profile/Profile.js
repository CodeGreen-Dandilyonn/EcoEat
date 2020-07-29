import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { firebase } from '../../firebase/config'

export default (props) => {
    const navigation = useNavigation();

    // const submitPressed = () => { //TODO: not working
    //     navigation.navigate('Login')
    // }

    const signOutUser = async () => {
        try {
            await firebase.auth().signOut();
            navigation.navigate('LoginScreen')
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={styles.container}>
            <Text>Profile Page</Text>
            <TouchableOpacity style={styles.submitBtn} onPress={props.signout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}