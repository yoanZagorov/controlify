import { onAuthStateChanged } from "firebase/auth"
import { auth } from "services/firebase/firebase.config"

export default function checkUserStatus() {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user)
      } else {
        resolve(false);
      }
    })
  })
}