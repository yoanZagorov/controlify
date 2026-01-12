import { redirect } from 'react-router'

import { ROUTES } from '#/constants'
import { checkUserAuthStatus, getAuthUserId } from '#/services/firebase/auth'

export default async function settingsLoader({ request }) {
  const userId = await getAuthUserId()
  if (!checkUserAuthStatus(userId, request.url)) {
    return redirect(ROUTES.LOGIN)
  }

  return null
}
