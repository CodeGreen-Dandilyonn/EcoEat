import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View , Searchbar , Image } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function ModifyPantry() {

    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);


    return (
        <View style={styles.container}>

        
            <Searchbar 
                    ref="searchBar" 
                    placeholder="Add Ingredients" 
                    onChangeText={onChangeSearch} 
                    value={searchQuery} 
            />

            <TouchableOpacity
                        style={styles.button}
                        onPress={() => onLoginPress()}>
                        <Text style={styles.buttonTitle}>Log in</Text>
            </TouchableOpacity>

         </View>
    )
};