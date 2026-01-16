import { collection, type CollectionReference, type QueryConstraint } from 'firebase/firestore'

import type { StoredCurrency, RetrievedCurrency } from '#/types/models/Currency'

import { db } from '../../firebase.config'
import { getEntities } from '../utils/entity'

// Get all of the root currencies
export default async function getCurrencies(
  query: QueryConstraint[] = [],
): Promise<RetrievedCurrency[]> {
  // Type assertion is necessary because Firestore's path-based API is untyped.
  // The path 'currencies' guarantees this is a Currency collection.
  const currenciesCollectionRef = collection(
    db,
    'currencies',
  ) as CollectionReference<StoredCurrency>
  return await getEntities<StoredCurrency>(currenciesCollectionRef, 'currencies', query)
}
