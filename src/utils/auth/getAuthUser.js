import { onAuthStateChanged } from "firebase/auth"
import { auth } from "services/firebase/firebase.config"

export default function getAuthUser() {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        resolve(authUser)
      } else {
        resolve(false);
      }
    })
  })
}