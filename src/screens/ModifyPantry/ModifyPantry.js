import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function ModifyPantry() {

    return (
        <View style={styles.container}>
            <Text>Modify Pantry Page</Text>
        </View>
    )
}