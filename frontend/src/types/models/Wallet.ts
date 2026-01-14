import type { Timestamp } from 'firebase/firestore'

import type { CURRENCY_CODES } from '#/constants'

export default interface Wallet {
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
