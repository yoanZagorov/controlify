import { where } from 'firebase/firestore'
import getTransactions from './getTransactions'

// Get transactions for a specified period
export default async function getPeriodTransactions({
  userId,
  periodInfo,
  providedWallets,
  byWallet = false,
}) {
  const { start, end } = periodInfo

  const periodTransactionsQuery = [
    where('date', '>=', start),
    where('date', '<=', end),
  ]

  const periodTransactionsByWallet = await getTransactions({
    userId,
    providedWallets,
    query: periodTransactionsQuery,
    dataFormat: byWallet ? 'structured' : 'flat',
  })

  return periodTransactionsByWallet
}
