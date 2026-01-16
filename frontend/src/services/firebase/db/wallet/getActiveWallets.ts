import { orderBy, type QueryConstraint, where } from 'firebase/firestore'

import type { RetrievedWallet } from '#/types/models/Wallet'

import getWallets from './getWallets'

// Get all the active wallets
export default async function getActiveWallets(
  userId: string,
  query: QueryConstraint[] = [],
): Promise<RetrievedWallet[]> {
  const activeWalletsQuery = [
    where('deletedAt', '==', null),
    orderBy('isDefault', 'desc'),
    orderBy('createdAt', 'desc'),
    ...query,
  ]
  return await getWallets(userId, activeWalletsQuery)
}
