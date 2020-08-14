import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../firebase/config';
import RecipeIngredients from '../../components/RecipeIngredients/RecipeIngredients';
import RecipeDetailIcons from '../../components/RecipeDetailIcons/RecipeDetailIcons';
import RecipeInstructions from '../../components/RecipeInstructions/RecipeInstructions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LeafTag from '../../components/LeafTag/LeafTag';

export default ({ route, changeRefresh }) => {

    const id = route.params.id;
    const navigation = useNavigation();
    // const APIKEY = '9d6c3108af68425a934d2fab780094ee'
    const APIKEY = 'ef5e2a0fe78649c68d5f5df5b63ab31f';
    // const APIKEY = 'f3edcb690303427c8511a070b39a73de';
    const savedRef = firebase.firestore().collection('saved_recipes')
    const userID = route.params.userId;
    const [isLoading, setIsLoading] = useState(true); // change to true
    const [recipe, setRecipe] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [saved, setSaved] = useState(false);

    const parseIngredients = (recipeIngredients) => {
        let array = [];
        for (let ingredient of recipeIngredients) {
            array.push(ingredient.original);
        }
        return array;
    }

    const parseInstr = (instructions) => {
        return !instructions ? '' : instructions;
    }

    const navigateBack = () => {
        console.log("navigating back");
        changeRefresh();
        navigation.goBack();
    }

    // retrieve if it is a saved recipe or not
    useEffect(() => {
        savedRef
            .where("user", "==", userID)
            .where("recipeId", "==", id)
            .get()
            .then(querySnapshot => {
                console.log("checking if saved");
                querySnapshot.forEach((doc) => {
                    setSaved(true);
                    console.log("Recipe already saved")
                })
            })
            .catch((error) => {
                setSaved(false)
                console.log("Not a saved recipe: " + error);
            })

    }, [])

    const bookmarkHandler = () => {
        console.log("bookmark pressed")
        if (saved) {
            console.log("userID = " + userID)
            savedRef
                .where("user", "==", userID)
                .where("recipeId", "==", id)
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach((doc) => {
                        doc.ref.delete().then(() => {
                            console.log("Saved Recipe successfully deleted");
                            setSaved(false);
                        })
                            .catch((error) => console.log("Error removing document: " + error));
                    })
                })
                .catch((error) => {
                    console.log("Error getting saved recipe: " + error);
                })
        } else {
            const data = {
                recipeId: id,
                recipeDetails: recipe,
                user: userID,
                collection: "Saved",
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            savedRef
                .add(data)
                .then(_doc => {
                    setSaved(true)
                })
                .catch((error) => {
                    console.log("Error saving recipe: " + error);
                    alert(error)
                });
        }
    }

    useEffect(() => {
        const getRecipe = async (id) => {
            console.log("recipe id inside = " + route.params.id);
            await fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${APIKEY}`)
                .then((res) => res.json())
                .then((resJson) => {
                    setRecipe({
                        id: id,
                        title: resJson.title,
                        image: resJson.image,
                        sourceUrl: resJson.sourceUrl,
                        servings: resJson.servings,
                        readyInMin: resJson.readyInMinutes,
                        pricePerServing: (parseFloat(resJson.pricePerServing) / 100).toFixed(2),
                        ingredients: parseIngredients(resJson.extendedIngredients),
                        instructions: parseInstr(resJson.instructions),
                        vegetarian: resJson.vegetarian,
                        vegan: resJson.vegan
                    })
                    console.log("setting recipes = " + resJson);

                })
                .then(() => setIsLoading(false))
                .catch((error) => {
                    console.log('error fetching recipe details = ' + error);
                    setHasError(true);
                    setIsLoading(true);
                });


        };

        getRecipe(id.toString());
    }, []);

    if (hasError) {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.arrowContainer} onPress={navigateBack}>
                    <Image style={styles.arrow} source={require('../../../assets/arrow.png')} />
                </TouchableOpacity>

                <Image style={styles.noRecipeImage} source={require('../../../assets/error.png')} />
                <Text style={styles.errorText}>
                    Sorry, we are unable to show this recipe at the moment.
                    Please try again later.
                    </Text>

            </View>

        )
    }

    else if (isLoading) {
        return (
            <View>
                <Text style={styles.loading}>Loading</Text>
            </View>
        )
    } else {
        return (
            <ScrollView style={styles.container}>

                {/* header */}
                {!recipe.vegetarian && !recipe.vegan ? (
                    <View>
                        <TouchableOpacity style={styles.arrowContainer} onPress={navigateBack}>
                            <Image style={styles.arrow} source={require('../../../assets/arrow.png')} />
                        </TouchableOpacity>

                        <View style={styles.header}>
                            <Text style={styles.recipeTitle}>{recipe.title}</Text>
                        </View>

                    </View>


                ) : (
                        <View style={styles.headerLeaf}>
                            <TouchableOpacity style={styles.arrowContainerLeaf} onPress={() => navigation.goBack()} >
                                <Image style={styles.arrowLeaf} source={require('../../../assets/arrow.png')} />
                            </TouchableOpacity>
                            <Text style={styles.recipeTitle}>{recipe.title}</Text>
                            <LeafTag />
                        </View>

                    )}

                {/* image */}
                {recipe.image ? (
                    <Image style={styles.recipeImage} source={{ uri: recipe.image }} />

                ) : (
                        <View style={styles.noImageContainer}>
                            <Text style={styles.noImage}>No available image.</Text>
                        </View>
                    )}

                <View style={styles.row}>
                    {/* ingredients */}
                    <Text style={styles.sectionTitle}>Ingredients</Text>
                    {/* Bookmark */}
                    <TouchableOpacity style={styles.bookmarkContainer} onPress={bookmarkHandler}>
                        {saved ? (
                            <Image style={styles.bookmarkIcon} source={require('../../../assets/bookmark_filled.png')} />
                        ) : (
                                // <BookmarkOutline style={styles.bookmarkIcon} />
                                <Image style={styles.bookmarkIcon} source={require('../../../assets/bookmark_outlined.png')} />
                            )}
                    </TouchableOpacity>
                </View>

                <View style={styles.ingredientsTimeContainer}>
                    <RecipeIngredients ingredients={recipe.ingredients} />
                    <RecipeDetailIcons readyInMin={recipe.readyInMin} pricePerServing={recipe.pricePerServing} />



                </View>

                {/* instructions */}
                <Text style={styles.sectionTitle}>Instructions</Text>
                {recipe.instructions ? (
                    <View>
                        <RecipeInstructions instructions={recipe.instructions} />
                    </View>

                ) : (
                        <View>
                            <Text style={{ ...styles.instructionText, ...styles.noInstr }}>No available instructions.</Text>
                        </View>

                    )}

            </ScrollView>
        )

    }


}