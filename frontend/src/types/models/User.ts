import type { Timestamp } from 'firebase/firestore'

import type { CURRENCY_CODES } from '#/constants'

// Represents the shape of a user document as stored in Firestore.
export interface StoredUser {
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

// Represents a user object returned from the data fetching layer.
export type RetrievedUser = StoredUser & { id: string }

