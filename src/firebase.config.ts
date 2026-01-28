import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApQa6SE-vPZEHIc9i1qCnQmRhKs4hnweA",
  authDomain: "g-85-fcedb.firebaseapp.com",
  projectId: "g-85-fcedb",
  storageBucket: "g-85-fcedb.firebasestorage.app",
  messagingSenderId: "784836608614",
  appId: "1:784836608614:web:44865c3379ec66dd9ae3a7",
  measurementId: "G-SEGC9TJYES",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
