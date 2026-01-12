import { where } from 'firebase/firestore'

import { getTodayStartAndEnd } from '#/utils/date'

import getTransactions from './getTransactions'

// Get all of today's transactions
export default async function getTodayTransactions(
  userId,
  providedWallets,
  query = [],
) {
  const { start, end } = getTodayStartAndEnd()
  const todayTransactionsQuery = [
    where('date', '>=', start),
    where('date', '<=', end),
    ...query,
  ]

  return await getTransactions({
    userId,
    providedWallets,
    query: todayTransactionsQuery,
    sortType: 'newestFirst',
  })
}
