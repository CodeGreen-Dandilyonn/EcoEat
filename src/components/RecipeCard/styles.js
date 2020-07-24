import { StyleSheet } from 'react-native';
import { Colors } from '../../colors'

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
        height: 200,
        width: 315,
        borderRadius: 5
    }
});