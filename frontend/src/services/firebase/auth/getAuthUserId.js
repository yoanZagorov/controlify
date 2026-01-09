import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase.config'

// Get the current auth user
// onAuthStateChange guarantees that the authUser obj will not be "undefined" when trying to access it
// The manual promise is used to be able to await the operation in the loader
export default function getAuthUserId() {
  return new Promise((resolve) => {
    const unsubsribe = onAuthStateChanged(auth, (authUser) => {
      unsubsribe()

      if (authUser) {
        resolve(authUser.uid)
      } else {
        resolve(null)
      }
    })
  })
}
