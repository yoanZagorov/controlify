import { collection, type CollectionReference, type QueryConstraint } from 'firebase/firestore'

import type { StoredCategory, RetrievedCategory } from '#/types/models/Category'
import { db } from '#/services/firebase/firebase.config'
import { getEntities } from '#/services/firebase/db/utils/entity'

// Get the current user categories
export default async function getCategories(
  userId: string,
  query: QueryConstraint[] = [],
): Promise<RetrievedCategory[]> {
  // Type assertion is necessary because Firestore's path-based API is untyped.
  // The path guarantees this is a Category collection.
  const categoriesCollectionRef = collection(
    db,
    `users/${userId}/categories`,
  ) as CollectionReference<StoredCategory>
  return await getEntities<StoredCategory>(categoriesCollectionRef, 'categories', query)
}
