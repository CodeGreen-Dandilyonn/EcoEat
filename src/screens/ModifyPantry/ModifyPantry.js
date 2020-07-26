import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { firebase } from '../../firebase/config'

export default (props) => {

    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])
    const navigation = useNavigation();

    const entityRef = firebase.firestore().collection('entities')
    const userID = props.extraData.id

    useEffect(() => {
        entityRef
            .where("authorID", "==", userID)
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newEntities = []
                    querySnapshot.forEach(doc => {
                        const entity = doc.data()
                        entity.id = doc.id
                        newEntities.push(entity)
                    });
                    setEntities(newEntities)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    const onAddButtonPress = () => {
        if (entityText && entityText.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                text: entityText,
                authorID: userID,
                createdAt: timestamp,
            };
            entityRef
                .add(data)
                .then(_doc => {
                    setEntityText('')
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }

    const renderEntity = ({ item, index }) => {
        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityText}>
                    {index}. {item.text}
                </Text>
            </View>
        )
    }

    const submitPressed = () => {
        navigation.navigate("Recipe Details");
    }

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
            {/* <TextInput
             style={styles.inputSearch}
             placeholder='Search'
             value={entityText}
             placeholderTextColor="#A6BCD0"
             underlineColorAndroid="transparent"
             autoCapitalize="none"
            />
            <TouchableOpacity style={styles.submitBtnSearch} onPress={submitPressed}>
                <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity> */}
                <TextInput
                    style={styles.input}
                    placeholder='Add new entity'
                    placeholderTextColor="#A6BCD0"
                    onChangeText={(text) => setEntityText(text)}
                    value={entityText}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
            {entities && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={entities}
                        renderItem={renderEntity}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                    />
                </View>
            )}
            <TouchableOpacity style={styles.submitBtn} onPress={submitPressed}>
                <Text style={styles.buttonText}>Find Recipes</Text>
            </TouchableOpacity>

        </View>
    )

}
