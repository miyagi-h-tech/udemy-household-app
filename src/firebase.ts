// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbBcQtYwMH06t650hcZA6pDRKHBm7kQIY",
  authDomain: "reacttype-household-app.firebaseapp.com",
  projectId: "reacttype-household-app",
  storageBucket: "reacttype-household-app.firebasestorage.app",
  messagingSenderId: "921583344221",
  appId: "1:921583344221:web:87b467966e9685bf800bb4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };