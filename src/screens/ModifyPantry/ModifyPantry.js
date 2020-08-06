import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, ScrollView, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { firebase } from '../../firebase/config';
import ingredients from '../../Data/ingredients.json';
import SearchResult from '../../components/SearchResult/SearchResult';
import { SwipeListView } from 'react-native-swipe-list-view';
import IngredientSearchResults from '../../components/IngredientSearchResults/IngredientSearchResults'

export default (props) => {

    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])
    const navigation = useNavigation();
    const [addedIngredients, setAddedIngredients] = useState([]);
    const [filteredIngredients, setFilteredIngredients] = useState([]);
    const [showResults, setShowResults] = useState(false)

    const entityRef = firebase.firestore().collection('entities')
    const userID = props.extraData.id

    const submitPressed = () => {
        props.changeRefresh()
        navigation.navigate("Home", {
            ingredients: addedIngredients
        });
    }

    useEffect(() => {
        entityRef
            .where("authorID", "==", userID)
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newEntities = []
                    querySnapshot.forEach(doc => {
                        const entity = doc.data();
                        entity.id = doc.id;
                        newEntities.push(entity);
                    });
                    setEntities(newEntities);
                },
                error => {
                    console.log(error);
                }
            )
    }, [])

    useEffect(() => {
        console.log("use effect saved ingredients array pantry")
        let savedIngredientsArray = [];
        entityRef
            .where("authorID", "==", userID)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    savedIngredientsArray.push(doc.data().text);
                    console.log("adding to array = " + doc.data().text)
                })
            })

        setAddedIngredients(savedIngredientsArray);
    }, [])

    const renderEntity = ({ item, index }) => {
        return (
            <View style={styles.entityContainer}>
                {/* <Text style={styles.entityText}>
                    {index}. {item.text}
                </Text> */}

                <Text style={styles.entityText}>
                    {index + 1}.  {item.text}
                </Text>
            </View>
        )
    }

    // ingredient is a string
    const resultOnPress = (ingredient) => {
        setShowResults(false);
        setEntityText('');
        if (ingredient && ingredient.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                text: ingredient,
                authorID: userID,
                createdAt: timestamp,
            };
            entityRef
                .add(data)
                .then(_doc => {
                    Keyboard.dismiss();
                    setAddedIngredients([...addedIngredients, ingredient]);
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }

    // savedIngredient is a string
    const deleteIngredient = (savedIngredient) => {
        entityRef
            .where("authorID", "==", userID)
            .where("text", "==", savedIngredient)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach((doc) => {
                    let index = addedIngredients.indexOf(doc.data().text);
                    let newIngredients = addedIngredients.splice(index, 1);
                    setAddedIngredients(newIngredients);
                    doc.ref.delete().then(() => {
                        console.log("Document successfully deleted");
                    })
                        .catch((error) => console.log("Error removing document: " + error));
                })
            })
            .catch((error) => {
                console.log("Error getting documents: " + error);
            })
    }

    // savedIngredient is an entity object
    const renderHiddenItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.deleteButton}
                onPress={() => deleteIngredient(item.text)}>
                <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
        );
    }

    const handleSearch = () => {
        let results = [];
        for (let ingredient of ingredients) {
            if (ingredient.ingredient.indexOf(entityText.toLowerCase().trimEnd()) != -1) {
                results.push(ingredient);
            }
        }

        setFilteredIngredients(results);
        setShowResults(true)

    }

    return (
        <View>
            <ScrollView>
                <View style={styles.container}>

                    {/* search bar */}
                    <View style={styles.formContainer}>
                        <Image style={styles.searchIcon} source={require('../../../assets/search.png')} />
                        <TextInput
                            style={styles.input}
                            placeholder='Search for an ingredient'
                            placeholderTextColor="#A6BCD0"
                            onChangeText={(text) => {
                                setEntityText(text)
                                setShowResults(false)
                            }
                            }
                            value={entityText}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                            returnKeyType='search'
                            onSubmitEditing={handleSearch}
                        />

                    </View>

                    {/* search results */}
                    {showResults ?
                        <View style={styles.searchContainer}>
                            <IngredientSearchResults ingredients={filteredIngredients} resultOnPress={resultOnPress} />
                        </View>
                        :

                        <View></View>}


                    {/* added ingredients */}
                    {entities && (
                        <View style={styles.listContainer}>
                            {/* <FlatList
                                data={entities}
                                renderItem={renderEntity}
                                keyExtractor={(item) => item.id}
                                removeClippedSubviews={true}
                            /> */}

                            <SwipeListView
                                data={entities}
                                renderItem={renderEntity}
                                keyExtractor={(item) => item.id}
                                renderHiddenItem={renderHiddenItem}
                                rightOpenValue={-75}
                            />
                        </View>
                    )}

                    <TouchableOpacity style={styles.submitBtn} onPress={submitPressed}>
                        <Text style={styles.buttonText}>Find Recipes</Text>
                    </TouchableOpacity>


                </View>

            </ScrollView>


        </View>
    )

}
