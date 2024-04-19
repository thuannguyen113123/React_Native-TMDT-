// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAK3t5xwLN1UBqv4fWJFg4Ot9Opt_q_mMc",
  authDomain: "marketapp-76015.firebaseapp.com",
  projectId: "marketapp-76015",
  storageBucket: "marketapp-76015.appspot.com",
  messagingSenderId: "854555720793",
  appId: "1:854555720793:web:2a9a1492f22ecc79f98548",
  measurementId: "G-83GSNREMYX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
