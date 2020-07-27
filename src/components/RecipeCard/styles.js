import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../colors'

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width * 0.9;
const imageHeight = dimensions.width * 0.7;
const marginLeft = (dimensions.width - (imageWidth)) / 2;

export default StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        backgroundColor: Colors.lightGray,
        borderRadius: 5,
        marginHorizontal: 30,
        marginVertical: 10
    },
    textContainer: {
        padding: 30
    },
    name: {
        fontSize: 18,
        color: Colors.darkGray,
        marginBottom: 10
    },
    titleLine: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leafTag: {
        marginLeft: 10
    },
    description: {
        color: Colors.medGray,
        fontSize: 14
    },
    image: {
        width: imageWidth - 30,
        height: 200,
        borderRadius: 5
    }
});