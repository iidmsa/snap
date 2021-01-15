import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtFARxeaYrNApPky-3VHn66CSGsQHmstA",
  authDomain: "snapchat-15be7.firebaseapp.com",
  projectId: "snapchat-15be7",
  storageBucket: "snapchat-15be7.appspot.com",
  messagingSenderId: "1070938244859",
  appId: "1:1070938244859:web:1adf63619a618bd846125e",
  measurementId: "G-JDJGJ2SJY3",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
