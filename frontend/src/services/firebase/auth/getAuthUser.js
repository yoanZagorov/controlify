import { onAuthStateChanged } from 'firebase/auth'

import { auth } from '#/services/firebase/firebase.config'

// Get the current auth user
// onAuthStateChange guarantees that the authUser obj will not be "undefined" when trying to access it
// The manual promise is used to be able to await the operation in the loader
export default function getAuthUser() {
  return new Promise((resolve) => {
    const unsubsribe = onAuthStateChanged(auth, (authUser) => {
      unsubsribe()

      if (authUser) {
        resolve(authUser)
      } else {
        resolve(null)
      }
    })
  })
}
