import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { firebase } from '../../firebase/config';
import ingredients from '../../Data/ingredients.json';

export default ({ ingredient, id, resultOnPress }) => {

    const handlePress = () => {
        resultOnPress(ingredient.charAt(0).toUpperCase() + ingredient.slice(1));
    }

    return (
        <View>
            <TouchableOpacity key={id} onPress={handlePress}>
                <Text style={styles.ingredient}>{ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}</Text>
                <View style={styles.divider}></View>

            </TouchableOpacity>
        </View>
    )

}