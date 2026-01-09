import { getStoredRedirectData, storeRedirectData } from '#utils/localStorage'

// Used in every loader to ensure the paths are protected
// Had to implement it like this because of the loaders' core philosophy. See the docs for more info
export default function checkUserAuthStatus(userId, url) {
  if (!userId) {
    const redirectData = getStoredRedirectData()

    if (redirectData) {
      const { msg, msgType, originalPath } = redirectData
      storeRedirectData(msg, msgType, originalPath)
    } else {
      const pathname = new URL(url).pathname
      storeRedirectData('You must log in first', 'alert', pathname)
    }

    return false
  }

  return true
}
