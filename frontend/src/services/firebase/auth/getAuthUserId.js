import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";

// Wrap it in a promise to ensure the loaders await the result
export default function getAuthUserId() {
  return new Promise((resolve) => {
    const unsubsribe = onAuthStateChanged(auth, (authUser) => {
      unsubsribe();

      if (authUser) {
        resolve(authUser.uid);
      } else {
        resolve(null);
      }
    })
  })
}
