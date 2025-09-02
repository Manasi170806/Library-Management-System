// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKlhPox5WtqjApU1AwNdkjXUgLb4b87r4",
  authDomain: "library-management-11b72.firebaseapp.com",
  projectId: "library-management-11b72",
  storageBucket: "library-management-11b72.firebasestorage.app",
  messagingSenderId: "161788106699",
  appId: "1:161788106699:web:fe634e310989afa152c84e",
  measurementId: "G-24WKX1VDDQ",
};s

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
