import type { Timestamp } from 'firebase/firestore'

import type { CURRENCY_CODES } from '#/constants'

export default interface User {
  email: string
  fullName: string
  currency: (typeof CURRENCY_CODES)[number]
  profilePic: {
    name: string
    publicId: string
    url: string
  } | null
  createdAt: Timestamp
}
