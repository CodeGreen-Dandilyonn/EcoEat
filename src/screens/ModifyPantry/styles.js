import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 3,
        marginRight: 5
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
        margin: 10
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
        height: 400
    },
    entityContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    entityText: {
        fontSize: 20,
        color: '#333333'
    }
})