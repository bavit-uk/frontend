// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhjwtOyu8waWKJl41CDu6ylBtYhBnWBrU",
  authDomain: "carflys-b1b57.firebaseapp.com",
  projectId: "carflys-b1b57",
  storageBucket: "carflys-b1b57.appspot.com",
  messagingSenderId: "938969305554",
  appId: "1:938969305554:web:67ab58a111eacf5de4b80b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
