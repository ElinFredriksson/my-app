// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDty7ao8gTGpD45Vxn1BCdX-p3vuhiyE9s",
  authDomain: "ecommerce-a3c93.firebaseapp.com",
  projectId: "ecommerce-a3c93",
  storageBucket: "ecommerce-a3c93.appspot.com",
  messagingSenderId: "782985143527",
  appId: "1:782985143527:web:ab3aa5f1835dbad11cee42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore(app);