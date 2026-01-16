import { collection, type CollectionReference, type QueryConstraint } from 'firebase/firestore'

import type { StoredQuote, RetrievedQuote } from '#/types/models/Quote'
import { db } from '#/services/firebase/firebase.config'
import { getEntities } from '#/services/firebase/db/utils/entity'

// Get all of the quotes
export default async function getQuotes(
  query: QueryConstraint[] = [],
): Promise<RetrievedQuote[]> {
  // Type assertion is necessary because Firestore's path-based API is untyped.
  // The path 'quotes' guarantees this is a Quote collection.
  const quotesCollectionRef = collection(
    db,
    'quotes',
  ) as CollectionReference<StoredQuote>
  return await getEntities<StoredQuote>(quotesCollectionRef, 'quotes', query)
}
