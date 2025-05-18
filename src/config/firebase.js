// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDyHGO6K70vNjjsT-5L9gpvH0Gduwv8D9s",
    authDomain: "vite-contact-efdd7.firebaseapp.com",
    projectId: "vite-contact-efdd7",
    storageBucket: "vite-contact-efdd7.firebasestorage.app",
    messagingSenderId: "830305796077",
    appId: "1:830305796077:web:3a203a2e0827cd18f9f1e4",
    measurementId: "G-MFGS02V44H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const db = getFirestore(app);