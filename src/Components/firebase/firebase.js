import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBKlhPox5WtqjApU1AwNdkjXUgLb4b87r4",
  authDomain: "library-management-11b72.firebaseapp.com",
  projectId: "library-management-11b72",
  storageBucket: "library-management-11b72.firebasestorage.app",
  messagingSenderId: "161788106699",
  appId: "1:161788106699:web:fe634e310989afa152c84e",
  measurementId: "G-24WKX1VDDQ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const store = getAnalytics(app);
