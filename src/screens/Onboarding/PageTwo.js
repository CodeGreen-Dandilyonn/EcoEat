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
            <Text>Page Two</Text>
            <TouchableOpacity onPress={nextPage}>
                <Text>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}