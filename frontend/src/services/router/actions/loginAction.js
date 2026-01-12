import { redirect } from 'react-router'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { ROUTES } from '#/constants'

import { createErrorResponse } from '../responses'

import { auth } from '#/services/firebase/firebase.config'
import { firebaseAuthErrorsMap } from '#/services/firebase/auth'

import { ValidationError } from '#/utils/errors'
import { storeRedirectData } from '#/utils/localStorage'
import { validateLoginFields } from '#/utils/validation'

export default async function loginAction({ request }) {
  const formData = Object.fromEntries(await request.formData())
  // Normalize data
  formData.email = formData.email.toLowerCase().trim()
  formData.password = formData.password.trim()
  const { originalPath, email, password } = formData

  try {
    // No need for complex checks - they are done when creating an account
    validateLoginFields(email, password)

    await signInWithEmailAndPassword(auth, email, password)

    // Message to display on successful login
    storeRedirectData('Successfully logged in!', 'success')

    return redirect(originalPath || ROUTES.APP)
  } catch (error) {
    console.error(error)

    if (error instanceof ValidationError) {
      return createErrorResponse(error.statusCode, error.message)
    }

    const firebaseError = firebaseAuthErrorsMap[error.code]
    if (firebaseError) {
      return createErrorResponse(
        firebaseError.message,
        firebaseError.statusCode,
      )
    }

    return createErrorResponse("Couldn't log you in. Please try again")
  }
}
