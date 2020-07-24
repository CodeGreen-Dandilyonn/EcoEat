import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../colors'

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width * 0.9;
const imageHeight = dimensions.width * 0.7;
const marginLeft = (dimensions.width - (imageWidth)) / 2;

// TODO: font family

export default StyleSheet.create({

    // Title and image
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },

    header: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginStart: marginLeft,

    },

    arrowContainer: {
        marginTop: 1,
        height: 20,
        width: 20,
    },

    arrow: {
        height: 20,
        width: 20,
    },

    recipeTitle: {
        fontSize: 20,
        fontWeight: '600',
        justifyContent: 'center',
        color: Colors.darkGray,
        marginStart: imageWidth / 4 - 20

    },

    recipeImage: {
        width: imageWidth,
        height: imageHeight,
        alignSelf: 'center',
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: 20,
        marginBottom: 20
    },

    sectionTitle: {
        fontSize: 22,
        fontWeight: '500',
        color: Colors.brightGreen,
        alignSelf: 'flex-start',
        marginStart: marginLeft
    },

    // Ingredients and time
    ingredientsTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 20,
        marginTop: 14
    },

    // Instructions
    instructionText: {
        fontSize: 18,
        fontWeight: '400',
        color: Colors.darkGray,
        marginStart: marginLeft,
        marginEnd: marginLeft,
        marginTop: 14,
    },

    instructions: {
        marginBottom: 20,
    }

})