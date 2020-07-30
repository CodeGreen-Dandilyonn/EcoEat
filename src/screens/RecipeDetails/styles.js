import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../colors'

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width * 0.94;
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
        marginTop: -52,
        flexDirection: 'row',
        justifyContent: 'center',

    },

    headerLeaf: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginStart: marginLeft,
        marginEnd: marginLeft,
    },

    arrowContainer: {
        height: 50,
        width: 20 + marginLeft,
        position: 'relative',
        // marginTop: 10,
        // top: 20,
        paddingTop: 10,
        paddingBottom: 4,
        left: marginLeft,
        backgroundColor: 'yellow',
        marginTop: 10
    },

    arrowContainerLeaf: {
        top: 3
    },

    arrow: {
        height: 22,
        width: 22,
        top: -10,
        left: 2
    },

    arrowLeaf: {
        height: 20,
        width: 20
    },

    leaf: {
        height: 20,
        width: 20
    },

    recipeTitle: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        color: Colors.darkGray,
        width: imageWidth - 60,
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

    // if there are no instructions
    instructionText: {
        fontSize: 18,
        fontWeight: '400',
        color: Colors.darkGray,
        marginStart: marginLeft,
        marginEnd: marginLeft,
        marginTop: 14,
    },

    noInstr: {
        marginBottom: 20
    },

    noImageContainer: {
        width: imageWidth,
        height: 20,
        alignSelf: 'center',
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: 20,
        marginBottom: 20
    },

    noImage: {
        fontSize: 18,
        fontWeight: '400',
        color: Colors.darkGray,
        textAlign: 'center'
    },

    loading: {
        textAlign: 'center',
        fontSize: 24,
        color: Colors.darkGray,
        fontWeight: '400',
        marginTop: 80
    }

})