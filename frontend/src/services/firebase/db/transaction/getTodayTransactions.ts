import { where, type QueryConstraint } from 'firebase/firestore'

import type { RetrievedTransaction } from '#/types/models/Transaction'
import type { RetrievedWallet } from '#/types/models/Wallet'
import { getTodayStartAndEnd } from '#/utils/date'

import getTransactions from './getTransactions'

// Get all of today's transactions
export default async function getTodayTransactions(
  userId: string,
  providedWallets: RetrievedWallet[],
  query: QueryConstraint[] = [],
): Promise<RetrievedTransaction[]> {
  const { start, end } = getTodayStartAndEnd()
  const todayTransactionsQuery: QueryConstraint[] = [
    where('date', '>=', start),
    where('date', '<=', end),
    ...query,
  ]

  return await getTransactions({
    userId,
    providedWallets,
    query: todayTransactionsQuery,
    dataFormat: 'flat',
    sortType: 'newestFirst',
  })
}
