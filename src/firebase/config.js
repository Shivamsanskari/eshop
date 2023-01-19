import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyCaeMGz978TPIprO1tD11Ir18BI8xoODk8",
  authDomain: "eshop-11f6c.firebaseapp.com",
  projectId: "eshop-11f6c",
  storageBucket: "eshop-11f6c.appspot.com",
  messagingSenderId: "937888425512",
  appId: "1:937888425512:web:c861fad538f71c2593f71d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;


/*
    In this file we Set the firebase config file.... After creating a project in Firebase console
*/