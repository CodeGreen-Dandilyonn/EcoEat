import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../colors';

const dimensions = Dimensions.get('window');
const searchWidth = dimensions.width * 0.90;

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F6F6F6'
    },
    formContainer: {
        height: 60,
        marginTop: 30,
        marginBottom: 12,
        flex: 1,
        paddingBottom: 10,
        justifyContent: 'center',
        width: searchWidth,
        flexDirection: 'row'
    },
    searchIcon: {
        width: 18,
        height: 18,
        position: 'relative',
        top: 15,
        left: 8,
        zIndex: 1
    },

    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        flex: 3,
        width: searchWidth - 24,
        paddingStart: 38,
        marginStart: -18
    },
    // inputSearch: {
    //     height: 48,
    //     borderRadius: 5,
    //     overflow: 'hidden',
    //     backgroundColor: 'white',
    //     paddingLeft: 16,
    //     bottom:50,
    //     flex: 2,
    //     marginRight: -270
    // },
    // submitBtnSearch: {
    //     height: 47,
    //     borderRadius: 5,
    //     backgroundColor: '#7BED8D',
    //     width: 80,
    //     alignItems: "center",
    //     justifyContent: 'center',
    //     left:355,
    //     bottom:50,
    //     margin: 10
    // },
    button: {
        flex: 1,
        height: 47,
        borderRadius: 5,
        backgroundColor: '#7BED8D',
        width: 80,
        alignItems: "center",
        justifyContent: 'center'
    },

    buttonText: {
        color: 'white',
        fontSize: 16
    },
    submitBtn: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#7BED8D',
        width: 200,
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 35
    },
    listContainer: {
        marginTop: 12,
        width: searchWidth,
        height: 400,
        borderRadius: 5
    },
    entityContainer: {
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16,
        paddingTop: 16,
        paddingStart: 16,
        backgroundColor: '#FFFFFF'
    },
    entityText: {
        fontSize: 20,
        color: '#333333'
    },
    searchContainer: {
        width: searchWidth,
        backgroundColor: '#FFFFFF',
        borderColor: Colors.darkGray,
        borderTopWidth: 1,
        borderStartWidth: 1,
        borderEndWidth: 1

    },

    deleteButton: {
        alignSelf: 'flex-end',
        width: 75,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.red,
        marginVertical: 3,
    },

    deleteText: {
        color: '#FFFFFF'
    },

    loading: {
        textAlign: 'center',
        fontSize: 24,
        color: Colors.darkGray,
        fontWeight: '400',
        marginTop: 80
    },
})