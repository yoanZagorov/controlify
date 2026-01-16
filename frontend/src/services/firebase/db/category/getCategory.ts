import { doc, type DocumentReference } from 'firebase/firestore'

import type { StoredCategory, RetrievedCategory } from '#/types/models/Category'
import { db } from '#/services/firebase/firebase.config'

import { getEntity } from '../utils/entity'

// Get a single user category
export default async function getCategory(
  userId: string,
  categoryId: string,
): Promise<RetrievedCategory> {
  // Type assertion is necessary because Firestore's path-based API is untyped.
  // The path guarantees this is a Category document.
  const categoryDocRef = doc(
    db,
    `users/${userId}/categories/${categoryId}`,
  ) as DocumentReference<StoredCategory>
  return await getEntity<StoredCategory>(categoryDocRef, categoryId, 'category')
}
