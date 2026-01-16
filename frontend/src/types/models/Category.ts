import type { Timestamp } from 'firebase/firestore'

import { CATEGORY, type ICON_NAMES } from '#/constants'

// Base interface shared by both user categories and root categories
interface BaseCategory {
  name: string
  type: (typeof CATEGORY.TYPES)[number]
  color: string
  iconName: (typeof ICON_NAMES.CATEGORIES)[number]
  createdAt: Timestamp
}

// Represents the shape of a user category document as stored in Firestore
// (users/{userId}/categories/). User categories may have a rootCategoryId
// that links them back to the root category they were created from.
export interface StoredCategory extends BaseCategory {
  rootCategoryId?: string
}

// Represents a user category object returned from the data fetching layer.
export type RetrievedCategory = StoredCategory & { id: string }

// Represents the shape of a root category document as stored in Firestore
// (categories/ collection at root level). Root categories are the default
// categories that users start with.
export type StoredRootCategory = BaseCategory

// Represents a root category object returned from the data fetching layer.
export type RetrievedRootCategory = StoredRootCategory & { id: string }

