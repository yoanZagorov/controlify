import { collection, type CollectionReference, type QueryConstraint } from 'firebase/firestore'

import type {
  StoredRootCategory,
  RetrievedRootCategory,
} from '#/types/models/Category'

import { db } from '../../firebase.config'
import { getEntities } from '../utils/entity'

// Get the default app categories
export default async function getRootCategories(
  query: QueryConstraint[] = [],
): Promise<RetrievedRootCategory[]> {
  // Type assertion is necessary because Firestore's path-based API is untyped.
  // The path 'categories' guarantees this is a RootCategory collection.
  const rootCategoriesCollectionRef = collection(
    db,
    'categories',
  ) as CollectionReference<StoredRootCategory>
  return await getEntities<StoredRootCategory>(
    rootCategoriesCollectionRef,
    'categories',
    query,
  )
}
