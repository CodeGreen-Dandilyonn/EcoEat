import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../colors'

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width * 0.94;
const imageHeight = dimensions.width * 0.7;
const marginLeft = (dimensions.width - (imageWidth)) / 2;

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F6F6F6'
    },

    loading: {
        textAlign: 'center',
        fontSize: 24,
        color: Colors.darkGray,
        fontWeight: '400',
        marginTop: 80
    },

    errorText: {
        textAlign: 'center',
        fontSize: 18,
        marginStart: 3 * marginLeft,
        marginEnd: 3 * marginLeft
    },

    errorContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        flex: 1,
        paddingTop: dimensions.height / 6
    },

    noIngredientsImage: {
        width: 160,
        height: 210,
        marginBottom: 20,
        marginTop: 0
    },

    noRecipesImage: {
        width: 160,
        height: 160,
        marginBottom: 20,
        marginTop: 20,
    },

    noSavedImage: {
        width: 130,
        height: 184,
        marginBottom: 20,
        marginTop: 0

    },
    downArrow: {
        marginTop: 30
    }
});