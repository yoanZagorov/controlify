import type { Timestamp } from 'firebase/firestore'

import type { CATEGORY, CURRENCY_CODES, ICON_NAMES } from '#/constants'

// Represents the shape of a transaction document as stored in Firestore
// (i.e. using Firestore Timestamp types for date fields).
export interface StoredTransaction {
  type: (typeof CATEGORY.TYPES)[number]
  amount: number
  currency: (typeof CURRENCY_CODES)[number]
  date: Timestamp
  category: {
    id: string
    name: string
    iconName: (typeof ICON_NAMES.CATEGORIES)[number]
    color: string
  }
  wallet: {
    id: string
    name: string
    color: string
    iconName: 'wallet'
    deletedAt: Timestamp
  }
  createdAt: Timestamp
}

// Represents a transaction object after it has been read from Firestore
// and normalized for client usage (e.g. Timestamps converted to Date).
export interface RetrievedTransaction
  extends Omit<StoredTransaction, 'date' | 'createdAt'> {
  id: string
  date: Date
  createdAt: Date
}

