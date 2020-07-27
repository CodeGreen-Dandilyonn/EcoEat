import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../colors'

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;
const imageHeight = dimensions.height * 0.9;

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    image: {
        width: imageWidth,
        height: imageHeight
    },
    button: {
        padding: 10,
        paddingHorizontal: 30,
        backgroundColor: Colors.brightGreen,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 5
    },
    btnText: {
        color: Colors.white,
        fontWeight: "700"
    }
});