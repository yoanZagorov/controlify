import { redirect } from 'react-router'
import { signOut } from 'firebase/auth'

import { ROUTES } from '#/constants'

import { createErrorResponse } from '../responses'

import { auth } from '#/services/firebase/firebase.config'

import { storeRedirectData } from '#/utils/localStorage'

export default async function appAction({ request }) {
  const formData = Object.fromEntries(await request.formData())

  const { intent } = formData

  if (intent === 'logout') {
    try {
      await signOut(auth)

      storeRedirectData('Successfully logged out!', 'success')
      return redirect(ROUTES.LOGIN)
    } catch (error) {
      console.error(error)
      throw createErrorResponse("Couldn't sign you out. Please try again")
    }
  }
}
