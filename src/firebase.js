
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore/lite';


const firebaseConfig = {
  apiKey: "AIzaSyBu5rvinl7cDnEa_pJGIyk1YEMhaZpbcw0",
  authDomain: "inter-demo-8665c.firebaseapp.com",
  projectId: "inter-demo-8665c",
  storageBucket: "inter-demo-8665c.appspot.com",
  messagingSenderId: "567044791577",
  appId: "1:567044791577:web:f5b1c92ff2d51b4bf1f988",
  measurementId: "G-Z5WBQ0L968"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app};