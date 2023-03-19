import firebase from 'firebase/compat/app'; // import firebase app module
import 'firebase/compat/firestore'; // import firestore module


const firebaseConfig = {
  apiKey: "AIzaSyAtovj2OmEznDtvPIc15U3SdGyWpCxmCyg",
  authDomain: "vercelproject-2f438.firebaseapp.com",
  projectId: "vercelproject-2f438",
  storageBucket: "vercelproject-2f438.appspot.com",
  messagingSenderId: "736931823881",
  appId: "1:736931823881:web:2317a3bfb987bdb8e813d8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();