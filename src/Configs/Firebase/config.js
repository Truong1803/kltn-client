// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbuwJh8-umxWJWxJGEkAahvoypcZaPRmg",
  authDomain: "scientific-research-e60e1.firebaseapp.com",
  projectId: "scientific-research-e60e1",
  storageBucket: "scientific-research-e60e1.appspot.com",
  messagingSenderId: "90974704343",
  appId: "1:90974704343:web:c964535cbcd69785d8d692",
  measurementId: "G-JRYZJL1G1P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
