import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { firebase } from '../../firebase/config';
import SearchResult from '../SearchResult/SearchResult';

export default ({ ingredients, resultOnPress }) => {

    const ingredientList = ingredients.map((filteredIngredient, index) => {
        return (
            <View key={index}>
                <SearchResult ingredient={filteredIngredient.ingredient} id={index} resultOnPress={resultOnPress} />
            </View>
        )
    });

    return (
        <View >
            {ingredientList}
        </View>
    )

}