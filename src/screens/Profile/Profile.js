import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import styles from './styles';
import { firebase } from '../../firebase/config'
import { Colors } from '../../colors'
import { ScrollView } from 'react-native-gesture-handler';
import LeafTag from '../../components/LeafTag/LeafTag';

const savedRef = firebase.firestore().collection('saved_recipes');

export default (props) => {
  const navigation = useNavigation();
  const [counter, setCounter] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  // const submitPressed = () => { //TODO: not working
  //     navigation.navigate('Login')
  // }


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("retreiving sustainable saved recipe count");
      let savedCount = 0
      savedRef
        .where("user", "==", props.extraData.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data().recipeDetails.vegan || doc.data().recipeDetails.vegetarian) {
              savedCount += 1;
            }
          })
        })
        .then(() => setCounter(savedCount))
        .catch((error) => { console.log("error fetching saved recipes count = " + error); })
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    console.log("retreiving sustainable saved recipe count");
    let savedCount = 0
    savedRef
      .where("user", "==", props.extraData.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().recipeDetails.vegan || doc.data().recipeDetails.vegetarian) {
            savedCount += 1;
          }
        })
      })
      .then(() => setCounter(savedCount))
      .catch((error) => { console.log("error fetching saved recipes count = " + error); })
  }, []);

  const capitalize = (nameString) => {
    let stringArray = nameString.split(/(\s+)/);
    let newString = '';
    for (let string of stringArray) {
      newString += string[0].toUpperCase() + string.substr(1) + '';
    }

    return newString;

  }

  const help = () => {
    console.log("help pressed")
    navigation.navigate('Tutorial')
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
        <TouchableOpacity style={styles.helpBtn} onPress={help}>
          <Ionicons name="ios-information-circle" size={30} color={Colors.darkGray} />
        </TouchableOpacity>
        <Image style={styles.icon} source={require('../../../assets/user_profile.png')} />

        <Text style={styles.subTitle}>Name</Text>
        <Text style={styles.userInfo}>{capitalize(props.extraData.fullName)}</Text>

        <Text style={styles.subTitle}>Email</Text>
        <Text style={styles.userInfo}>{props.extraData.email}</Text>

      </View>
      {counter > 0 ?
        <View style={styles.counter}>
          <View style={styles.counterBasic}>
            <LeafTag />
            <Text style={styles.counterText}>Congratulations! You've saved {counter} sustainable recipes, which is saving around {counter * 500} gallons of water</Text>
            <TouchableOpacity style={styles.question} onPress={() => setShowInfo(!showInfo)}>
              <Ionicons name="ios-help-circle-outline" size={20} color={Colors.darkGray} />
            </TouchableOpacity>

          </View>
          {showInfo ?
            <Text style={styles.extraInfo}>* Based on statistics equating the production of 0.5-1.0 lb of beef to 500 gallons of water</Text> :
            <></>
          }
        </View> :
        <></>

      }


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