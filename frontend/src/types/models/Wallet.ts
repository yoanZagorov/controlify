import type { Timestamp } from 'firebase/firestore'

import type { CURRENCY_CODES } from '#/constants'

// Represents the shape of a wallet document as stored in Firestore.
export interface StoredWallet {
  balance: number
  currency: (typeof CURRENCY_CODES)[number]
  name: string
  isDefault: boolean
  categoriesVisibility: Record<string, boolean>
  iconName: 'wallet'
  color: string
  createdAt: Timestamp
  deletedAt: Timestamp | null
}

// Represents a wallet object returned from the data fetching layer.
export type RetrievedWallet = StoredWallet & { id: string }

