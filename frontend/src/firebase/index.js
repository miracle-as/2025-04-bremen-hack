// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAokx29I_2RNHLGbHFHJ63rOw4vWAwR9ak",
  authDomain: "bremen-hack-2025-04.firebaseapp.com",
  projectId: "bremen-hack-2025-04",
  storageBucket: "bremen-hack-2025-04.firebasestorage.app",
  messagingSenderId: "1027916402953",
  appId: "1:1027916402953:web:0d58a076e9e12f7df883d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const functions = getFunctions(app);
const db = getFirestore(app);

// Uncomment this line if you're running Firebase Functions locally
// connectFunctionsEmulator(functions, "localhost", 5001);

export { storage, functions, db }; 