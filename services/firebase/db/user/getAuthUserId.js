import { onAuthStateChanged } from "firebase/auth";
import { auth } from "services/firebase/firebase.config";

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
