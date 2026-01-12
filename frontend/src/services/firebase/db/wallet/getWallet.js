import { doc } from 'firebase/firestore'
import { db } from '#/services/firebase/firebase.config'
import { getEntity } from '../utils/entity'

// Get a specific wallet
export default async function getWallet(userId, walletId) {
  const walletDocRef = doc(db, `users/${userId}/wallets/${walletId}`)
  return await getEntity(walletDocRef, walletId, 'wallet')
}
