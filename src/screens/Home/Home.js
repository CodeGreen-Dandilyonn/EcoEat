import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, Image, Dimensions } from 'react-native';
import styles from './styles';
import { firebase } from '../../firebase/config';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { Ionicons } from "@expo/vector-icons";

export default (props) => {

    const APIKEY = '9d6c3108af68425a934d2fab780094ee'
    // const APIKEY = 'ef5e2a0fe78649c68d5f5df5b63ab31f';
    // const APIKEY = '596a72c90259413f8ee06dda6b928cee';
    // const APIKEY = 'f3edcb690303427c8511a070b39a73de';

    const entityRef = firebase.firestore().collection('entities');
    const savedRef = firebase.firestore().collection('saved_recipes');
    const userID = props.extraData.id;
    const numResults = 4;

    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [savedIngredients, setSavedIngredients] = useState([]);
    const [needRefresh, setNeedRefresh] = useState(props.needRefresh);
    const [currCollection, setCurrCollection] = useState('Recommendations');
    const [savedRecipes, setSavedRecipes] = useState([]);

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'recommendations', title: 'Recommendations' },
        { key: 'saved', title: 'Saved' }
    ]);


    useEffect(() => {
        console.log("refreshing page")
    }, [needRefresh])

    useEffect(() => {
        if (currCollection != "Recommendations") {
            savedRef
                .where("user", "==", userID)
                .where("collectionName", "==", currCollection)
                .orderBy('createdAt', 'desc')
                .onSnapshot(
                    querySnapshot => {
                        console.log("Got saved recipes")
                        const newRecipes = []
                        querySnapshot.forEach(doc => {
                            const recipe = doc.data();
                            recipe.id = doc.recipeId;
                            newRecipes.push(recipe);
                        });
                        setRecipes(newRecipes);
                        setIsLoading(false);
                    },
                    error => {
                        console.log("Error retrieving saved recipes: " + error);
                    }
                )
        }
    }, [])

    useEffect(() => {
        if (currCollection == "Recommendations") {
            // return user's ingredients from firebase
            const getIngredients = async () => {
                console.log("use effect saved ingredients array home")
                let savedIngredientsArray = [];
                return await entityRef
                    .where("authorID", "==", userID)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            savedIngredientsArray.push(doc.data().text);
                            console.log("adding to array = " + doc.data().text)
                        })
                    })
                    .then(() => console.log("saved ingredients array = " + savedIngredientsArray))
                    .then(() => setSavedIngredients(savedIngredientsArray))
                    .then(() => {
                        return savedIngredientsArray;
                    })
            }

            // get recipe recommendations based on ingredients
            const getRecommendations = async (ingredients) => {
                setIsLoading(false)
                await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.toString()}&number=${numResults}&apiKey=${APIKEY}`)
                    .then((res) => res.json())
                    .then((resJson) => {
                        setRecipes(resJson);
                        console.log('recipes = ' + resJson)
                    })
                    .then(() => setIsLoading(false))
                    .catch((error) => {
                        console.log('error fetching recipe recommendations = ' + error);
                        setIsLoading(true);
                    });
            };

            getIngredients().then((ingredients) => getRecommendations(ingredients));
        }
    }, [])

    useEffect(() => {
        console.log("retreiving saved recipes");
        let savedRecipesArray = [];
        savedRef
            .where("user", "==", userID)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    savedRecipesArray.push(doc.data().recipeDetails);
                    console.log("adding to  saved recipes array = " + JSON.stringify(doc.data().recipeDetails));
                })
            })
            .then(() => console.log("saved recipes array = " + savedRecipesArray))
            .then(() => setSavedRecipes(savedRecipesArray))
            .catch((error) => { console.log("error fetching saved recipes = " + error); })

    }, [])


    const renderRecipe = ({ item, index }) => {

        // otherwise bookmarks don't show on saved recipes
        if (typeof (item.id) == 'string') {
            item.id = parseInt(item.id)
        }
        return (
            <RecipeCard
                img={item.image}
                name={item.title}
                id={item.id}
                isGreen={true}
                key={index}
                userId={userID}
            />
        )
    }

    // view recommendations
    const recommendedRoute = () => {
        // no saved ingredients
        if (savedIngredients.length == 0) {
            return (
                <View style={styles.errorContainer}>
                    <Image style={styles.noIngredientsImage} source={require('../../../assets/ingredients.png')} />
                    <Text style={styles.errorText}>
                        To help you use up the ingredients you already have on hand,
                        input your ingredients to get recommended recipes!
                            </Text>
                    <Ionicons name="ios-arrow-dropdown" size={30} style={styles.downArrow} />

                </View>

            )
        }

        // if max number of API calls is reached, response.message is an error message
        else if (recipes.message) {
            return (
                <View style={styles.errorContainer}>
                    <Image style={styles.noRecipesImage} source={require('../../../assets/error.png')} />
                    <Text style={styles.errorText}>
                        Sorry, we are unable to get recipes for you at the moment.
                        Please try again later.
                            </Text>
                </View>

            )
        } else {    // show recommended recipes
            return (
                <View style={styles.container}>
                    <View style={styles.listContainer}>
                        <FlatList
                            data={recipes}
                            renderItem={renderRecipe}
                            keyExtractor={(item, index) => item.id + ""}
                            removeClippedSubviews={true}
                        />
                    </View>
                </View>
            )
        }

    }

    const savedRoute = () => {
        // no saved recipes
        if (savedRecipes.length == 0) {
            return (
                <View style={styles.errorContainer}>
                    <Image style={styles.noSavedImage} source={require('../../../assets/bookmark_outline.png')} />
                    <Text style={styles.errorText}>
                        You currently don't have any saved recipes. Select a recipe from your recommendations, and
                        hit the bookmark to see it later here!
                                </Text>
                </View>

            )
        } else { // show saved recipes
            return (
                <View style={styles.container}>
                    <View style={styles.listContainer}>
                        <FlatList
                            data={savedRecipes}
                            renderItem={renderRecipe}
                            keyExtractor={(item, index) => item.id + ""}
                            removeClippedSubviews={true}
                        />
                    </View>
                </View>
            )

        }

    }

    const initialLayout = { width: Dimensions.get('window').width };

    // assigns tabs to views
    const renderScene = SceneMap({
        recommendations: recommendedRoute,
        saved: savedRoute,
    });

    // custom styling for tab bar
    const renderTabBar = (props) => {
        return (
            <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: 'white' }}
                style={{ backgroundColor: '#68D379' }}
            />
        )
    }

    if (isLoading) {
        return (
            <View>
                <Text style={styles.loading}>Loading...</Text>
            </View>
        )
    }

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            renderTabBar={renderTabBar}
        />
    );

}