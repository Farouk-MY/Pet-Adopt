// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pet-adopte.firebaseapp.com",
  projectId: "pet-adopte",
  storageBucket: "pet-adopte.appspot.com",
  messagingSenderId: "373126426074",
  appId: "1:373126426074:web:96ba604b296d77ac7b24e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const storage=getStorage(app)
