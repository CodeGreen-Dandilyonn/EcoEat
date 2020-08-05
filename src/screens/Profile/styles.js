import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    submitBtn: {
        height: 47,
        borderRadius: 5,
        top: 500,
        backgroundColor: '#7BED8D',
        width: 200,
        alignItems: "center",
        justifyContent: 'center',
        margin: 10
    },
    profileImage: {
      top: 15,
      width: 200,
      height: 200,
      borderRadius: 100,
      overflow: "hidden"
    },
    image: {
      flex: 1,
      width: undefined,
      height: undefined
    },
    active: {
      backgroundColor: "#228B22",
      position: "absolute",
      bottom: 25,
      left: 5,
      padding: 4,
      height: 25,
      width: 25,
      borderRadius: 10
    },
    information: {
      alignSelf: "center",
      alignItems: "center",
      marginTop: 16
    },
    location: {
      paddingVertical: 15,
      paddingHorizontal: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
});
