import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../colors';

const dimensions = Dimensions.get('window');
const searchWidth = dimensions.width * 0.90;

export default StyleSheet.create({
    ingredient: {
        color: Colors.darkGray,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
    },

    divider: {
        height: 1,
        width: searchWidth,
        backgroundColor: Colors.darkGray
    }
})