import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { firebase } from '../../../src/firebase/config'

const userRef = firebase.firestore().collection('users')

export default (props) => {

    const finishOnboarding = () => {
        console.log(props)
        const user = props.extraData
        userRef
            .doc(user.id)
            .set({
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                onboardingComplete: true
            }).then(function () {
                console.log("Document successfully written!");
            }).catch(function (error) {
                console.error("Error writing document: ", error);
            });
    }

    return (
        <View style={styles.container}>
            <Text>Page Three</Text>
            <TouchableOpacity onPress={finishOnboarding}>
                <Text>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}