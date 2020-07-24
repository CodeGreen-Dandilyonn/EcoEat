import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'

export default () => {

    return (
        <View style={styles.container}>
            <Text>Home Recipe Page</Text>
        </View>
    )
}