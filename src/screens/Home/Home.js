import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { Colors } from '../../colors'

import RecipeCard from '../../components/RecipeCard/RecipeCard'

const entities = [1, 2, 3, 4]

export default () => {

    const renderRecipe = ({ item, index }) => {
        return (
            <RecipeCard
                img="https://www.dinneratthezoo.com/wp-content/uploads/2016/02/acai-bowl-recipe-12-683x1024.jpg"
                name="Mixed Berry Acai Bowl"
                description="Delicious acai bowl packed with hearty fruits like strawberries, blueberries and blackberries."
                id="1001"
                isGreen={true}
                key={index}
            />
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.listContainer}>
                <FlatList
                    data={entities}
                    renderItem={renderRecipe}
                    keyExtractor={(item, index) => item.id}
                    removeClippedSubviews={true}
                />
            </View>
        </View>
    )
}