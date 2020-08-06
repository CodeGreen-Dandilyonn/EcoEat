import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { firebase } from '../../firebase/config'

export default (props) => {
    const navigation = useNavigation();

    const onRecipeClicked = (recipeId, userId) => {
        navigation.navigate("Recipe Details", {
            id: recipeId,
            userId: userId
        })
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => onRecipeClicked(props.id, props.userId)}>
            <Image
                style={styles.image}
                source={{
                    uri: props.img,
                }}
                resizeMode={'cover'}
            />
            <View style={styles.textContainer}>
                <View style={styles.titleLine}>
                    <Text style={styles.name}>{props.name}</Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}