import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../colors'

const dimensions = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',

    },

    loading: {
        textAlign: 'center',
        fontSize: 24,
        color: Colors.darkGray,
        fontWeight: '400',
        marginTop: 80
    }
});