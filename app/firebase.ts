import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdM2cU89cNbzLkZpFDyfxCe1BwyGIwVIs",
  authDomain: "team3-105f8.firebaseapp.com",
  projectId: "team3-105f8",
  storageBucket: "team3-105f8.firebasestorage.app",
  messagingSenderId: "671712839784",
  appId: "1:671712839784:web:559f57dad69c75198993dd"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);