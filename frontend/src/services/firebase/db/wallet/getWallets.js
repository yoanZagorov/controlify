import { collection } from 'firebase/firestore'

import { getEntities } from '#/services/firebase/db/utils/entity'
import { db } from '#/services/firebase/firebase.config'

// Get wallets
export default async function getWallets(userId, query) {
  const walletsCollectionRef = collection(db, `users/${userId}/wallets`)
  return await getEntities(walletsCollectionRef, 'wallets', query)
}
