// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
//   apiKey: "AIzaSyDC_Xz4jrPmi1HBNFIY87q7YQPWA-kbp0g",
//   authDomain: "bremen-hack-2025.firebaseapp.com",
//   projectId: "bremen-hack-2025",
//   storageBucket: "bremen-hack-2025.appspot.com",
//   messagingSenderId: "387151274953",
//   appId: "1:387151274953:web:a0d0d6374e9e48bbf40c4e",
//   measurementId: "G-5T8JHSKCLH"
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

export { storage }; 