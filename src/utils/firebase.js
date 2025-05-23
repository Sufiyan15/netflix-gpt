// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4hqovt1scYhjnR_Z_Dqczh2v441MuDr0",
  authDomain: "netflixgpt-6bb44.firebaseapp.com",
  projectId: "netflixgpt-6bb44",
  storageBucket: "netflixgpt-6bb44.firebasestorage.app",
  messagingSenderId: "891208293483",
  appId: "1:891208293483:web:3f9b6c1b3776380d87e52e",
  measurementId: "G-CKQRZEEL89",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
