import type { Timestamp } from 'firebase/firestore'

import type { CATEGORY, CURRENCY_CODES, ICON_NAMES } from '#/constants'

export default interface Transaction {
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
