import { collection, type CollectionReference, type QueryConstraint } from 'firebase/firestore'

import type { StoredWallet, RetrievedWallet } from '#/types/models/Wallet'
import { db } from '#/services/firebase/firebase.config'
import { getEntities } from '#/services/firebase/db/utils/entity'

// Get wallets
export default async function getWallets(
  userId: string,
  query: QueryConstraint[] = [],
): Promise<RetrievedWallet[]> {
  // Type assertion is necessary because Firestore's path-based API is untyped.
  // The path guarantees this is a Wallet collection.
  const walletsCollectionRef = collection(
    db,
    `users/${userId}/wallets`,
  ) as CollectionReference<StoredWallet>
  return await getEntities<StoredWallet>(walletsCollectionRef, 'wallets', query)
}
