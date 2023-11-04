
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBprgpp8SL2NLuCI98LFQk11lPkTofISM4",
  authDomain: "react-notes-3a628.firebaseapp.com",
  projectId: "react-notes-3a628",
  storageBucket: "react-notes-3a628.appspot.com",
  messagingSenderId: "751193411707",
  appId: "1:751193411707:web:2422b3d55d6ca8d1fc92de"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const notesCollection = collection(db, "notes")