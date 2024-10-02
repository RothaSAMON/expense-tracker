// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD46tpILsMAgUgloWOG1g9y1spzv6ue94Y",
  authDomain: "expense-tracker-9abec.firebaseapp.com",
  projectId: "expense-tracker-9abec",
  storageBucket: "expense-tracker-9abec.appspot.com",
  messagingSenderId: "703293316397",
  appId: "1:703293316397:web:60b95e7b0fb62349e587a4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// firebase login
// firebase init
// firebase deploy
