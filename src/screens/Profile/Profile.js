import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
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
        <TouchableOpacity style={styles.submitBtn} onPress={props.signout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image source={require("../../../assets/autumn.jpg")} style = {styles.image} resizeMode="cover"></Image>
          </View>
          <View style={styles.active}></View>
        </View>
  
        <View style = {styles.information}>
          <Text style={[styles.text, {fontWeight: "200", fontSize: 36}]}> Autumn Goodman </Text>
        </View>
  
        <View style = {styles.location}>
        </View>
        </View>
        // <View style={styles.container}>
        //     <Text>Profile Page</Text>
        //     <TouchableOpacity style={styles.submitBtn} onPress={props.signout}>
        //         <Text style={styles.buttonText}>Logout</Text>
        //     </TouchableOpacity>
        // </View>
    )
}