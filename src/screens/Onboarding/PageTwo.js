import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default (props) => {
    const navigation = useNavigation();

    const nextPage = () => {
        navigation.navigate("Page Three");
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require("./images/pagetwo.png")}
                resizeMode={'cover'}
            />
            <TouchableOpacity onPress={nextPage} style={styles.button}>
                <Text style={styles.btnText}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}