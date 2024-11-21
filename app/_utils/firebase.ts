// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9QNjFdjNfhutMxad32cHXvvajI5t46CY",
  authDomain: "bav-it-uk.firebaseapp.com",
  projectId: "bav-it-uk",
  storageBucket: "bav-it-uk.firebasestorage.app",
  messagingSenderId: "18638262840",
  appId: "1:18638262840:web:97a273faae5ecd85ed8ccd",
  measurementId: "G-KHX22YP1B9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
