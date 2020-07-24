import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { firebase } from '../../firebase/config'

import LeafTag from '../LeafTag/LeafTag'

export default (props) => {
    const navigation = useNavigation();

    const onRecipeClicked = (recipeId) => {
        navigation.navigate("Recipe Details", {
            id: recipeId,
        })
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => onRecipeClicked(props.id)}>
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
                    {props.isGreen && <LeafTag styles={styles.leafTag} />}

                </View>


                <Text style={styles.description}>{props.description}</Text>
            </View>
        </TouchableOpacity>
    )
}