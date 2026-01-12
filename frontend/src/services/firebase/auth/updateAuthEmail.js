import { signOut, verifyBeforeUpdateEmail } from 'firebase/auth'
import { redirect } from 'react-router'

import { ROUTES } from '#/constants'

import { getAuthUser } from '#/services/firebase/auth'
import { auth } from '#/services/firebase/firebase.config'

import { StatusCodeError } from '#/utils/errors'
import { storeRedirectData } from '#/utils/localStorage'

// Update the user email in their Firebase Auth account
export default async function updateAuthEmail(email) {
  const authUser = await getAuthUser()

  try {
    // Send a verification email first
    await verifyBeforeUpdateEmail(authUser, email)

    storeRedirectData(
      'Please check your inbox and verify your new email address to finalize the update',
      'notification',
      ROUTES.SETTINGS,
    )
    await signOut(auth)
    return redirect(ROUTES.LOGIN)
  } catch (error) {
    if (error.code === 'auth/requires-recent-login') {
      // If a recent login is required, just catch the error so it doesn't bubble up and send the user to the login page
      storeRedirectData(
        'This change requires a recent login. Please log in with your old email address and try again.',
        'notification',
        ROUTES.SETTINGS,
      )
      await signOut(auth)
      return redirect(ROUTES.LOGIN)
    }

    throw new StatusCodeError(
      'Unable to update your email address. Please try again',
      { cause: error },
    )
  }
}
