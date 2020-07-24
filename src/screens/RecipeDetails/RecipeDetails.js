import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'

export default ({ navigation, route }) => {

    const { id } = route.params;

    return (
        <View style={styles.container}>
            <Text>Recipe Details Page! Recipe Id: {id}</Text>
        </View>
    )
}