import { redirect } from 'react-router'

import { ROUTES } from '#/constants'
import { getAuthUserId } from '#/services/firebase/auth'
import { getRandomQuote } from '#/services/firebase/db/quote'
import { getStoredRedirectData } from '#/utils/localStorage'

import { createErrorResponse, createSuccessResponse } from '../responses'

export default async function authLoader() {
  const userId = await getAuthUserId()

  // If there is already a session, just send the user to the app route
  if (userId) {
    return redirect(ROUTES.APP)
  }

  try {
    const storedRedirectData = getStoredRedirectData()
    const randomQuote = await getRandomQuote()

    const loaderData = {
      quote: randomQuote,
      redirectData: storedRedirectData || {},
    }

    return createSuccessResponse(loaderData)
  } catch (error) {
    console.error(error)

    throw createErrorResponse(
      'Sorry, an unexpected error occurred. Please try again and contact us at yoan.zagorov@gmail.com if the issue persists',
    )
  }
}
