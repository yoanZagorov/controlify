import { redirect } from 'react-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import { ROUTES } from '#constants'

import { createErrorResponse } from '../responses'

import { auth } from '#services/firebase/firebase.config'
import { createUser } from '#services/firebase/db/user'
import {
  firebaseAuthErrorsMap,
  getAuthUser,
  rollbackAuthUserCreation,
} from '#services/firebase/auth'

import { ValidationError } from '#utils/errors'
import { storeRedirectData } from '#utils/localStorage'
import { validateSignupCredentials } from '#utils/validation'

export default async function createAccountAction({ request }) {
  const formData = Object.fromEntries(await request.formData())
  // Normalize data
  formData.email = formData.email.toLowerCase().trim()
  formData.fullName = formData.fullName.trim()
  formData.password = formData.password.trim()
  const { originalPath, email, password, fullName } = formData

  try {
    validateSignupCredentials(email, password, fullName)

    const {
      user: { uid: userId },
    } = await createUserWithEmailAndPassword(auth, email, password)

    await createUser(userId, email, fullName)

    // Message to display on successful account creation
    storeRedirectData('Successfully created your account!', 'success')

    return redirect(originalPath || ROUTES.APP)
  } catch (error) {
    console.error(error)

    // Try ensuring some form of atomicity for the operations
    if (error.message === "Couldn't create the user's Firestore account") {
      const authUser = await getAuthUser()

      try {
        await rollbackAuthUserCreation(authUser)
      } catch (error) {
        // If here, there is a a misalignment between user entries in Firebase Auth and Firestore
        // To do: Handle this scenario with a cron job on the backend, clearing "orphaned" users periodically
        return createErrorResponse(
          'There is a temporary issue with our servers. Please try creating your account later',
        )
      }
    }

    if (error instanceof ValidationError) {
      return createErrorResponse(error.message, error.statusCode)
    }

    const firebaseError = firebaseAuthErrorsMap[error.code]
    if (firebaseError) {
      return createErrorResponse(
        firebaseError.message,
        firebaseError.statusCode,
      )
    }

    return createErrorResponse("Couldn't create your account. Please try again")
  }
}
