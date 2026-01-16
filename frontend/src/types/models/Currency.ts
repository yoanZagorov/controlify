import type { CURRENCY_CODES, ICON_NAMES } from '#/constants'

// Represents the shape of a currency document as stored in Firestore.
export interface StoredCurrency {
  code: (typeof CURRENCY_CODES)[number]
  conversionRate: number
  iconName: (typeof ICON_NAMES.CURRENCIES)[number]
  isBase: boolean
}

// Represents a currency object returned from the data fetching layer.
export type RetrievedCurrency = StoredCurrency & { id: string }

