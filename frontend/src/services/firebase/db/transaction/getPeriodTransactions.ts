import { where, type QueryConstraint } from 'firebase/firestore'

import type { RetrievedTransaction } from '#/types/models/Transaction'
import type { RetrievedWallet } from '#/types/models/Wallet'

import getTransactions from './getTransactions'

interface GetPeriodTransactionsParams {
  userId: string
  periodInfo: {
    start: Date
    end: Date
  }
  providedWallets: RetrievedWallet[]
  byWallet?: boolean
}

type StructuredResult = Array<RetrievedWallet & { transactions: RetrievedTransaction[] }>

// Get transactions for a specified period
export default async function getPeriodTransactions({
  userId,
  periodInfo,
  providedWallets,
  byWallet = false,
}: GetPeriodTransactionsParams): Promise<RetrievedTransaction[] | StructuredResult> {
  const { start, end } = periodInfo

  const periodTransactionsQuery: QueryConstraint[] = [
    where('date', '>=', start),
    where('date', '<=', end),
  ]

  if (byWallet) {
    return await getTransactions({
      userId,
      providedWallets,
      query: periodTransactionsQuery,
      dataFormat: 'structured',
    })
  } else {
    return await getTransactions({
      userId,
      providedWallets,
      query: periodTransactionsQuery,
      dataFormat: 'flat',
    })
  }
}
