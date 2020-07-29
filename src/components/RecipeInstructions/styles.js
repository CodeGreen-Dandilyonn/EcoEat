import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../colors'

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width * 0.9;
const imageHeight = dimensions.width * 0.7;
const marginLeft = (dimensions.width - (imageWidth)) / 2;

// TODO: font family

export default StyleSheet.create({
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