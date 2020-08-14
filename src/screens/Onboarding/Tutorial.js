import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { firebase } from '../../../src/firebase/config'

const userRef = firebase.firestore().collection('users')

export default (props) => {
    const navigation = useNavigation();

    const nextPage = () => {
        navigation.navigate("EcoEat");
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require("./images/pagetutorial.png")}
                resizeMode={'cover'}
            />
            <TouchableOpacity onPress={nextPage} style={styles.button}>
                <Text style={styles.btnText}>Close</Text>
            </TouchableOpacity>
        </View>
    )
}