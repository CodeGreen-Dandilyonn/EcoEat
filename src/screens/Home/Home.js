import React, { useEffect, useState } from 'react'
import { FlatList, Text, View, Image } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { Colors } from '../../colors'

import RecipeCard from '../../components/RecipeCard/RecipeCard'

const entities = [
    {
        "id": 73420,
        "image": "https://spoonacular.com/recipeImages/73420-312x231.jpg",
        "imageType": "jpg",
        "likes": 0,
        "missedIngredientCount": 3,
        "missedIngredients": [
            {
                "aisle": "Baking",
                "amount": 1.0,
                "id": 18371,
                "image": "https://spoonacular.com/cdn/ingredients_100x100/white-powder.jpg",
                "meta": [],
                "name": "baking powder",
                "original": "1 tsp baking powder",
                "originalName": "baking powder",
                "unit": "tsp",
                "unitLong": "teaspoon",
                "unitShort": "tsp"
            },
            {
                "aisle": "Spices and Seasonings",
                "amount": 1.0,
                "id": 2010,
                "image": "https://spoonacular.com/cdn/ingredients_100x100/cinnamon.jpg",
                "meta": [],
                "name": "cinnamon",
                "original": "1 tsp cinnamon",
                "originalName": "cinnamon",
                "unit": "tsp",
                "unitLong": "teaspoon",
                "unitShort": "tsp"
            },
            {
                "aisle": "Milk, Eggs, Other Dairy",
                "amount": 1.0,
                "id": 1123,
                "image": "https://spoonacular.com/cdn/ingredients_100x100/egg.png",
                "meta": [],
                "name": "egg",
                "original": "1 egg",
                "originalName": "egg",
                "unit": "",
                "unitLong": "",
                "unitShort": ""
            }
        ],
        "title": "Apple Or Peach Strudel",
        "unusedIngredients": [],
        "usedIngredientCount": 1,
        "usedIngredients": [
            {
                "aisle": "Produce",
                "amount": 6.0,
                "id": 9003,
                "image": "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg",
                "meta": [],
                "name": "apples",
                "original": "6 large baking apples",
                "originalName": "baking apples",
                "unit": "large",
                "unitLong": "larges",
                "unitShort": "large"
            }
        ]
    },
    {
        "id": 632660,
        "image": "https://spoonacular.com/recipeImages/632660-312x231.jpg",
        "imageType": "jpg",
        "likes": 3,
        "missedIngredientCount": 4,
        "missedIngredients": [
            {
                "aisle": "Milk, Eggs, Other Dairy",
                "amount": 1.5,
                "extendedName": "unsalted butter",
                "id": 1001,
                "image": "https://spoonacular.com/cdn/ingredients_100x100/butter-sliced.jpg",
                "meta": [
                    "unsalted",
                    "cold"
                ],
                "name": "butter",
                "original": "1 1/2 sticks cold unsalted butter cold unsalted butter<",
                "originalName": "cold unsalted butter cold unsalted butter<",
                "unit": "sticks",
                "unitLong": "sticks",
                "unitShort": "sticks"
            },
            {
                "aisle": "Produce",
                "amount": 4.0,
                "id": 1079003,
                "image": "https://spoonacular.com/cdn/ingredients_100x100/red-delicious-apples.png",
                "meta": [
                    "red",
                    " such as golden delicious, peeled, cored and cut into 1/4-inch-thick slices "
                ],
                "name": "red apples",
                "original": "4 larges red apples, such as Golden Delicious, peeled, cored and cut into 1/4-inch-thick slices",
                "originalName": "s red apples, such as Golden Delicious, peeled, cored and cut into 1/4-inch-thick slices",
                "unit": "large",
                "unitLong": "larges",
                "unitShort": "large"
            },
            {
                "aisle": "Spices and Seasonings",
                "amount": 2.0,
                "id": 2010,
                "image": "https://spoonacular.com/cdn/ingredients_100x100/cinnamon.jpg",
                "meta": [],
                "name": "cinnamon",
                "original": "2 teaspoons cinnamon",
                "originalName": "cinnamon",
                "unit": "teaspoons",
                "unitLong": "teaspoons",
                "unitShort": "tsp"
            },
            {
                "aisle": "Nut butters, Jams, and Honey",
                "amount": 2.0,
                "id": 19719,
                "image": "https://spoonacular.com/cdn/ingredients_100x100/apricot-jam.jpg",
                "meta": [
                    "melted"
                ],
                "name": "apricot preserves",
                "original": "2 tablespoons apricot preserves, melted and strained",
                "originalName": "apricot preserves, melted and strained",
                "unit": "tablespoons",
                "unitLong": "tablespoons",
                "unitShort": "Tbsp"
            }
        ],
        "title": "Apricot Glazed Apple Tart",
        "unusedIngredients": [
            {
                "aisle": "Produce",
                "amount": 1.0,
                "id": 9003,
                "image": "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg",
                "meta": [],
                "name": "apples",
                "original": "apples",
                "originalName": "apples",
                "unit": "serving",
                "unitLong": "serving",
                "unitShort": "serving"
            }
        ],
        "usedIngredientCount": 0,
        "usedIngredients": []
    }
]

export default (props) => {

    const APIKEY = '9d6c3108af68425a934d2fab780094ee'
    // const APIKEY = 'ef5e2a0fe78649c68d5f5df5b63ab31f';
    // const APIKEY = '596a72c90259413f8ee06dda6b928cee';
    // const APIKEY = 'f3edcb690303427c8511a070b39a73de';

    const entityRef = firebase.firestore().collection('entities');
    const userID = props.extraData.id;
    const numResults = 4;

    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [savedIngredients, setSavedIngredients] = useState([])

    useEffect(() => {

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

    }, [])


    const renderRecipe = ({ item, index }) => {
        return (
            <RecipeCard
                img={item.image}
                name={item.title}
                id={item.id}
                isGreen={true}
                key={index}
            />
        )
    }

    const falsey = [];

    if (isLoading) {
        return (
            <View>
                <Text style={styles.loading}>Loading...</Text>
            </View>
        )
    }


    // no saved ingredients
    else if (savedIngredients.length == 0) {
        return (
            <View style={styles.errorContainer}>
                <Image style={styles.noIngredientsImage} source={require('../../../assets/ingredients.png')} />
                <Text style={styles.errorText}>
                    To help you use up the ingredients you already have on hand,
                    input your ingredients to get recommended recipes!
                </Text>
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
    }

    else {
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