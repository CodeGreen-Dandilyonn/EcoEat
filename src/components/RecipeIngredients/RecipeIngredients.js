import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import styles from './styles';
import { firebase } from '../../firebase/config';

export default ({ ingredients }) => {

    const ingredientList = ingredients.map((ingredientName) => {
        return (
            <View key={ingredientName} style={styles.ingredient}>
                <Image style={styles.bulletPoint} source={require('../../../assets/green_circle.png')} />
                <Text style={styles.ingredientName}>{ingredientName}</Text>

            </View>
        )
    });

    return (
        <View style={styles.recipeIngredients}>
            {ingredientList}
        </View>
    )

}