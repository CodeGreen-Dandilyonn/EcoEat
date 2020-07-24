import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

export default (props) => {

    return (
        <TouchableOpacity style={[styles.circle, props.style]} onPress={() => onRecipeClicked(props.id)}>
            <Ionicons name="ios-leaf" size={17} color='white' />
        </TouchableOpacity>
    )
}