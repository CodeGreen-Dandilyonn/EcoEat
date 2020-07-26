import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View ,SwipeView} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import filter from 'lodash.filter';
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

    deleteItemById = id => () => {
        const filteredData = this.state.data.filter(item => item.id !== id);
        this.setState({ data: filteredData });
      }

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

    // Temporary recipeList variable
    const recipeInfo = {
        recipeList: ['butter', 'flour', 'sugar', 'pecans', 'buttermilk', 'salt', 'eggs']
    }

    handleSearch = text => {
        const formattedQuery = text.toLowerCase();
        const data = filter(this.state.fullData, user => {
            return this.contains(user, formattedQuery);
        });
        this.setState({ data, query: text });
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
            {
            /* <TextInput
             style={styles.inputSearch}
             placeholder='Search'
             value={entityText}
             placeholderTextColor="#A6BCD0"
             underlineColorAndroid="transparent"
             autoCapitalize="none"
            />
            <TouchableOpacity style={styles.submitBtnSearch} onPress={submitPressed}>
                <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity> */
            }
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

                
                <TouchableOpacity style={styles.clearPantryButton} onPress={onRemoveButtonPress}>
                <Text style={styles.buttonText}>Clear Pantry </Text>
                </TouchableOpacity>
                
            
            </View>
            {entities && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={entities}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                        renderItem= {renderEntity}
                        /*
                        renderItem= { ( {renderEntity} ) => (
                            <View style = { styles.container} >
                                <SwipeView
                                onSwipedLeft={() => this.deleteItemById(item.id)}
                                />
                            </View>
                        )}
                        */
                    />
                </View>
            )}
            
            <TouchableOpacity style={styles.submitBtn} onPress={submitPressed}>
                <Text style={styles.buttonText}>Find Recipes</Text>
            </TouchableOpacity>

        </View>
    )

}