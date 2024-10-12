import { firebaseConfig, app } from "/config/firebase.config";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);