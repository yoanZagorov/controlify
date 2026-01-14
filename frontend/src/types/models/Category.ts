import type { Timestamp } from 'firebase/firestore'

import { CATEGORY, type ICON_NAMES } from '#/constants'

export default interface Category {
  name: string
  type: (typeof CATEGORY.TYPES)[number]
  color: string
  iconName: (typeof ICON_NAMES.CATEGORIES)[number]
  createdAt: Timestamp
}
