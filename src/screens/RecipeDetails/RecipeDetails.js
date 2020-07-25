import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../firebase/config';
import RecipeIngredients from '../../components/RecipeIngredients/RecipeIngredients';
import RecipeTime from '../../components/RecipeTime/RecipeTime';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default ({ id, title, imageUrl }) => {

    const navigation = useNavigation();

    // TODO: make GET request to API using id to fetch recipe details and format JSON response as below
    const recipe = {
        id: 324694,
        name: 'Buttermilk Pancakes',
        imageUrl: 'https://images.unsplash.com/photo-1565299543923-37dd37887442?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=828&q=80',
        sourceUrl: 'http://www.foodnetwork.com/recipes/bobby-flay/silver-dollar-buttermilk-pecan-pancakes-with-bourbon-molasses-butter-and-maple-syrup.html',
        servings: 6,
        ingredients: ['1 tsp baking powder', '1 tbsp butter', '2 cups flour', '1/2 cup sugar', '1 cup pecans', '3/4 cup buttermilk', '3 tbsp maple syrup', '1 tsp salt', '2 eggs'],
        prepTime: 20,
        cookTime: 35,
        instructions: 'Preheat the oven to 200 degrees F.                          Whisk together the flour, pecans, granulated sugar, light brown sugar, baking powder, baking soda, and salt in a medium bowl. Whisk together the eggs, buttermilk, butter and vanilla extract and vanilla bean in a small bowl. Add the egg mixture to the dry mixture and gently mix to combine. Do not overmix. Let the batter sit at room temperature for at least 15 minutes and up to 30 minutes before using.                          Heat a cast iron or nonstick griddle pan over medium heat and brush with melted butter. Once the butter begins to sizzle, use 2 tablespoons of the batter for each pancake and cook until the bubbles appear on the surface and the bottom is golden brown, about 2 minutes, flip over and cook until the bottom is golden brown, 1 to 2 minutes longer. Transfer the pancakes to a platter and keep warm in a 200 degree F oven.                          Serve 6 pancakes per person, top each with some of the bourbon butter. Drizzle with warm maple syrup and dust with confectioners sugar. Garnish with fresh mint sprigs and more toasted pecans, if desired.                          Bourbon Molasses Butter:                          Combine the bourbon and sugar in a small saucepan and cook over high heat until reduced to 3 tablespoons, remove and let cool.                          Put the butter, molasses, salt and cooled bourbon mixture in a food processor and process until smooth. Scrape into a bowl, cover with plastic wrap and refrigerate for at least 1 hour to allow the flavors to meld. Remove from the refrigerator about 30 minutes before using to soften.'
    }

    // TODO: upload icon

    // API puts exactly 26 spaces between each paragraph
    const instrArray = recipe.instructions.split('                          ');
    const instructionParagraphs = instrArray.map((paragraph, index) => {
        return (
            <Text key={index} style={styles.instructionText}>{paragraph}</Text>
        )
    });

    return (
        <ScrollView style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity style={styles.arrowContainer} onPress={() => navigation.goBack()} >
                    <Image style={styles.arrow} source={require('../../../assets/arrow.png')} />
                </TouchableOpacity>
                <Text style={styles.recipeTitle}>{recipe.name}</Text>
            </View>

            <Image style={styles.recipeImage} source={{ uri: recipe.imageUrl }} />

            <Text style={styles.sectionTitle}>Ingredients</Text>

            <View style={styles.ingredientsTimeContainer}>
                <RecipeIngredients ingredients={recipe.ingredients} />
                <RecipeTime prepTime={recipe.prepTime} cookTime={recipe.cookTime} />
            </View>

            <Text style={styles.sectionTitle}>Instructions</Text>
            <View style={styles.instructions}>
                {instructionParagraphs}
            </View>

        </ScrollView>
    )
}