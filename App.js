import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { LoginScreen, Home, RegistrationScreen } from './src/screens'
import ModifyPantry from './src/screens/ModifyPantry/ModifyPantry'
import Profile from './src/screens/Profile/Profile'
import RecipeDetails from './src/screens/RecipeDetails/RecipeDetails'
import PageOne from './src/screens/Onboarding/PageOne'
import Tutorial from './src/screens/Onboarding/Tutorial'
import PageTwo from './src/screens/Onboarding/PageTwo'
import PageThree from './src/screens/Onboarding/PageThree'
import PageFour from './src/screens/Onboarding/PageFour'
import PageFive from './src/screens/Onboarding/PageFive'
import ActionBarImage from './assets/icon.png'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { decode, encode } from 'base-64'
import { firebase } from './src/firebase/config'

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

export default function App() {

  if (loading) {
    return (
      <></>
    )
  }

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
        usersRef
          .where("id", "==", user.uid)
          .onSnapshot(
            querySnapshot => {
              querySnapshot.forEach(doc => {
                setOnboardingComplete(doc.data().onboardingComplete)
              });
            },
            error => {
              console.log("error", error)
            }
          )
      } else {
        setLoading(false)
      }
    });
  }, []);

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [onboardingComplete, setOnboardingComplete] = useState(false)
  const [needRefresh, setNeedRefresh] = useState(false)
  // console.disableYellowBox(true);
  const changeRefresh = () => {
    console.log("calling for refresh")
    setNeedRefresh(!needRefresh);
  }

  const signout = async () => {
    try {
      await firebase.auth().signOut();
      setUser(null)
    } catch (e) {
      console.log(e);
    }
  }

  function RecipeStack() {
    return (
      <HomeStack.Navigator>
        {/* <HomeStack.Screen name="Home" component={Home} /> */}
        <HomeStack.Screen name="Home">
          {props => <Home {...props} extraData={user} needRefresh={needRefresh} />}
        </HomeStack.Screen>
        <HomeStack.Screen name="Recipe Details">
          {props => <RecipeDetails {...props} extraData={user} changeRefresh={changeRefresh} />}
        </HomeStack.Screen>
        {/* <HomeStack.Screen name="Recipe Details" component={RecipeDetails} /> */}
      </HomeStack.Navigator>
    )

  }

  function MainTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            size = 30
            if (route.name === 'Home') {
              iconName = focused ? 'ios-albums' : 'ios-albums';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'ios-person' : 'ios-person';
            } else if (route.name === 'Modify Pantry') {
              iconName = focused ? 'ios-add-circle' : 'ios-add-circle';
              size = 50;
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#7BED8D",
          inactiveTintColor: '#748A9D',
          showLabel: false,
        }}
        initialRouteName="Modify Pantry"
      >

        <Tab.Screen name="Home" component={RecipeStack} />
        <Tab.Screen name="Modify Pantry">
          {props => <ModifyPantry {...props} extraData={user} changeRefresh={changeRefresh} />}
        </Tab.Screen>
        <Tab.Screen name="Profile">
          {props => <Profile {...props} signout={signout} extraData={user} />}
        </Tab.Screen>
      </Tab.Navigator >
    )
  }

  return (
    <NavigationContainer >
      <Stack.Navigator>
        {user ? (
          <>
            {onboardingComplete ?
              (<>
                <Stack.Screen name="EcoEat" component={MainTabs} />
                <Stack.Screen options={{ headerShown: false }} name="Tutorial" component={Tutorial} />
              </>)
              :
              (<>
                <Stack.Screen options={{ headerShown: false }} name="Page One" component={PageOne} />
                <Stack.Screen options={{ headerShown: false }} name="Page Two" component={PageTwo} />
                <Stack.Screen options={{ headerShown: false }} name="Page Three" component={PageThree} />
                <Stack.Screen options={{ headerShown: false }} name="Page Four" component={PageFour} />
                <Stack.Screen options={{ headerShown: false }} name="Page Five">
                  {props => <PageFive {...props} extraData={user} setOnboardingComplete={() => setOnboardingComplete} />}
                </Stack.Screen>
              </>)}
          </>
        ) : (
            <>

              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Registration" component={RegistrationScreen} />

            </>
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}