import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default () => {
    const navigation = useNavigation();

    const nextPage = () => {
        navigation.navigate("Page Two");
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require("./images/pageone.png")}
                resizeMode={'cover'}
            />
            <TouchableOpacity onPress={nextPage} style={styles.button}>
                <Text style={styles.btnText}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}