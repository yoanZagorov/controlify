import { doc, type DocumentReference } from 'firebase/firestore'

import type { StoredWallet, RetrievedWallet } from '#/types/models/Wallet'
import { db } from '#/services/firebase/firebase.config'

import { getEntity } from '../utils/entity'

// Get a specific wallet
export default async function getWallet(
  userId: string,
  walletId: string,
): Promise<RetrievedWallet> {
  // Type assertion is necessary because Firestore's path-based API is untyped.
  // The path guarantees this is a Wallet document.
  const walletDocRef = doc(
    db,
    `users/${userId}/wallets/${walletId}`,
  ) as DocumentReference<StoredWallet>
  return await getEntity<StoredWallet>(walletDocRef, walletId, 'wallet')
}
