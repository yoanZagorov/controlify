import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXdd8tw86Td77Oc7YBZFJAhc5yuDX5lHs", // Safe - Firebase relies on security rules, not on the apiKey for keeping the routes secure
  authDomain: "controlify-3bdd8.firebaseapp.com",
  projectId: "controlify-3bdd8",
  storageBucket: "controlify-3bdd8.appspot.com",
  messagingSenderId: "837564313324",
  appId: "1:837564313324:web:e0c624f85288ce2a173fc9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };