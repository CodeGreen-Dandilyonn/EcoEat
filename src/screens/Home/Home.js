import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
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

    const APIKEY = 'f3edcb690303427c8511a070b39a73de';

    // TODO: replace with actual ingredients to search
    const searchIngredients = ['egg', 'onion', 'salt'];

    // user's ingredients is a string array
    // console.log("route params = " + route.params.ingredients)
    // console.log("route params   = " + props.ingredients)

    // const searchIngredients = props.ingredients;
    const numResults = 4;
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // change to true
    const entityRef = firebase.firestore().collection('entities');
    const userID = props.extraData.id;
    const [addedIngredients, setAddedIngredients] = useState([]);

    // useEffect(() => {
    //     console.log("use effect saved ingredients array")
    //     let savedIngredientsArray = [];
    //     entityRef
    //         .where("authorID", "==", userID)
    //         .get()
    //         .then((querySnapshot) => {
    //             querySnapshot.forEach((doc) => {
    //                 savedIngredientsArray.push(doc.data().text);
    //                 console.log("adding to array = " + doc.data().text)
    //             })
    //         })

    //     setAddedIngredients(savedIngredientsArray);
    // }, [])

    // const parseIngredients = (recipeIngredients) => {
    //     let array = [];
    //     for (let ingredient of recipeIngredients) {
    //         array.push(ingredient.original);
    //     }
    //     return array;
    // }

    // const parseInstr = (instructions) => {
    //     return !instructions ? '' : instructions;
    // }

    // useEffect(() => {
    //     const getRecommendations = async (searchIngredients) => {
    //         console.log("search ingredients = " + searchIngredients)
    //         await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchIngredients}&number=${numResults}&apiKey=${APIKEY}`)
    //             .then((res) => res.json())
    //             .then((resJson) => {
    //                 setRecipes(resJson);
    //                 console.log("recipes = " + resJson)
    //             })
    //             .then(() => setIsLoading(false))
    //             // .then(() => console.log("recipes = " + recipes))
    //             .catch((error) => {
    //                 console.log('error = ' + error);
    //                 setIsLoading(true);
    //             });
    //     };

    //     getRecommendations(searchIngredients);

    // }, []);

    // const parseDetails = (resJson) => {
    //     console.log("parse details resJon id = " + resJson.id);
    //     console.log("parse details resJon name = " + resJson.title);
    //     const details = {
    //         id: resJson.id,
    //         title: resJson.title,
    //         imageUrl: resJson.image,
    //         sourceUrl: resJson.sourceUrl,
    //         servings: resJson.servings,
    //         readyInMin: resJson.readyInMinutes,
    //         pricePerServing: (parseFloat(resJson.pricePerServing) / 100).toFixed(2),
    //         ingredients: parseIngredients(resJson.extendedIngredients),
    //         instructions: parseInstr(resJson.instructions),
    //         vegetarian: resJson.vegetarian,
    //         vegan: resJson.vegan
    //     }
    //     console.log("details object = " + details)
    //     console.log("details object = " + JSON.stringify(details))
    //     return details;

    // }

    // const getDetails = async (id) => {
    //     return await fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${APIKEY}`)
    //         .then((res) => res.json())
    //         .then((resJson) => parseDetails(resJson))
    //         .then((parsedDetails) => { return parsedDetails })

    // }

    const renderRecipe = ({ item, index }) => {
        // const recipeDetails = getDetails(item.id)
        // // console.log("recipe details json rendering = " + JSON.stringify(recipeDetails));
        return (
            <RecipeCard
                img={item.image}
                name={item.title}
                // description="Delicious acai bowl packed with hearty fruits like strawberries, blueberries and blackberries."
                id={item.id}
                isGreen={true}
                key={index}
            // recipe={recipeDetails}
            />
        )
    }

    if (isLoading) {
        return (
            <View>
                <Text style={styles.loading}>Loading...</Text>
            </View>
        )
    } else {

        // TODO: change flatlist to have data={recipes} once we call API
        return (
            <View style={styles.container}>
                <View style={styles.listContainer}>
                    <FlatList
                        data={entities}
                        renderItem={renderRecipe}
                        keyExtractor={(item, index) => item.id + ""}
                        removeClippedSubviews={true}
                    />
                </View>
            </View>
        )
    }
}