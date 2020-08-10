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

  const capitalize = (nameString) => {
    let stringArray = nameString.split(/(\s+)/);
    let newString = '';
    for (let string of stringArray) {
      newString += string[0].toUpperCase() + string.substr(1) + '';
    }

    return newString;

  }

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

      <View style={styles.infoContainer}>

        <Image style={styles.icon} source={require('../../../assets/user_profile.png')} />

        <Text style={styles.subTitle}>Name</Text>
        <Text style={styles.userInfo}>{capitalize(props.extraData.fullName)}</Text>

        <Text style={styles.subTitle}>Email</Text>
        <Text style={styles.userInfo}>{props.extraData.email}</Text>

      </View>
      <TouchableOpacity style={styles.submitBtn} onPress={props.signout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      {/* <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image source={require("../../../assets/autumn.jpg")} style = {styles.image} resizeMode="cover"></Image>
          </View>
          <View style={styles.active}></View>
        </View>
  
        <View style = {styles.information}>
          <Text style={[styles.text, {fontWeight: "200", fontSize: 36}]}> Autumn Goodman </Text>
        </View> */}

      <View style={styles.location}>
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