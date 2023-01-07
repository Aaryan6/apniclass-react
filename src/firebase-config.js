// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAH_OJrqF5G05WyRTy8yWYdJOETA6Hf7Xw",
  authDomain: "apniclass-mern.firebaseapp.com",
  projectId: "apniclass-mern",
  storageBucket: "apniclass-mern.appspot.com",
  messagingSenderId: "720178284143",
  appId: "1:720178284143:web:01c655d42012e4d4efef9a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export default app;
