import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYOSbHrhNVONbl2fgjJ-vZxOLZFsKrqYk",
  authDomain: "chap-app-cdcd6.firebaseapp.com",
  projectId: "chap-app-cdcd6",
  storageBucket: "chap-app-cdcd6.appspot.com",
  messagingSenderId: "307761203342",
  appId: "1:307761203342:web:1c17b13f63d4dbd66ca1df"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
