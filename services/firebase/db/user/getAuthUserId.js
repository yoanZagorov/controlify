import { onAuthStateChanged } from "firebase/auth"
import { auth } from "services/firebase/firebase.config"

export default function getAuthUserId() {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        resolve(authUser.uid)
      } else {
        resolve(false);
      }
    })
  })
}