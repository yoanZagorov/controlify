import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase/firebase.config";

export default function getAuthUser() {
  return new Promise((resolve) => {
    const unsubsribe = onAuthStateChanged(auth, (authUser) => {
      unsubsribe();

      if (authUser) {
        resolve(authUser);
      } else {
        resolve(null);
      }
    })
  })
}
