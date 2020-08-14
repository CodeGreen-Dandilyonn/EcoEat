import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../colors'

const dimensions = Dimensions.get('window');
const containerWidth = dimensions.width * 0.80;

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F6F6F6'
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  },
  submitBtn: {
    height: 47,
    borderRadius: 5,
    // top: 210,
    backgroundColor: Colors.brightGreen,
    width: 200,
    // al: "flex-end",
    alignItems: "center",
    justifyContent: 'center',
    margin: 0
  },
  helpBtn: {
    alignItems: 'flex-end',
    marginRight: 15,
    marginTop: 5
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
    height: undefined,
    margin: 0
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

  title: {
    fontSize: 20,
    color: Colors.darkGray,
    fontWeight: '700',
    marginTop: 20,
    marginLeft: 40,
    alignSelf: "flex-start"

  },

  infoContainer: {
    backgroundColor: '#FFFFFF',
    width: containerWidth,
    // height: 310,
    marginTop: 30,
    borderRadius: 5,
    paddingBottom: 20
  },

  subTitle: {
    fontSize: 18,
    color: Colors.darkGray,
    fontWeight: '600',
    marginTop: 20,
    marginLeft: 40,
    alignSelf: "flex-start",

  },

  userInfo: {
    fontSize: 14,
    color: Colors.darkGray,
    fontWeight: '400',
    marginTop: 10,
    marginLeft: 40,
    alignSelf: "flex-start"
  },

  icon: {
    height: 110,
    width: 110,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  counter: {
    margin: 30,
    backgroundColor: Colors.brightGreen,
    padding: 20,
    borderRadius: 5
  },
  counterText: {
    color: Colors.white,
    fontSize: 20
  }
});
