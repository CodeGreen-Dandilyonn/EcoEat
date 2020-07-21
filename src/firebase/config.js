import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBLt7l5uVjkoOVXyz5szA9xs_GCD8yuAFU',
  authDomain: 'new-recipe-app-91ed6.firebaseapp.com',
  databaseURL: 'https://new-recipe-app-91ed6.firebaseio.com',
  projectId: 'new-recipe-app-91ed6',
  storageBucket: 'new-recipe-app-91ed6.appspot.com',
  messagingSenderId: '948604080443',
  appId: '1:948604080443:android:38cd617510d536023b271e',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };