// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6Vtt-XFBG3tHt4i3X3dSR9qKEJfmtR5U",
  authDomain: "new-look-d8e58.firebaseapp.com",
  projectId: "new-look-d8e58",
  storageBucket: "new-look-d8e58.appspot.com",
  messagingSenderId: "56846620541",
  appId: "1:56846620541:web:db8e6cbebe0dfd9f17de14",
  measurementId: "G-6CRF0MHVRB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
