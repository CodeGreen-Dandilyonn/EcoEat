import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../colors'

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width * 0.9;
const imageHeight = dimensions.width * 0.7;
const marginLeft = (dimensions.width - (imageWidth)) / 2;

export default StyleSheet.create({
    // RecipeTime
    recipeTime: {
        alignSelf: 'flex-end',
        marginEnd: marginLeft,
        marginStart: 20,
        height: 80,
        position: 'absolute',
        top: -7,
        right: 0
    },

    iconClock: {
        width: 30,
        height: 30,
    },

    iconPot: {
        width: 33,
        height: 33
    },

    timeValue: {
        fontSize: 16,
        fontWeight: '400',
        color: Colors.darkGray,
        marginStart: 14

    },

    time: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },

    timeTop: {
        marginBottom: 3
    },

})