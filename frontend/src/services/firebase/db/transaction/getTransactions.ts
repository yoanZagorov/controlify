import {
  collection,
  getDocs,
  query as firebaseQuery,
  type QueryConstraint,
  type Timestamp,
} from 'firebase/firestore'

import type {
  RetrievedTransaction,
  StoredTransaction,
} from '#/types/models/Transaction'
import type { RetrievedWallet } from '#/types/models/Wallet'
import { db } from '#/services/firebase/firebase.config'

import { getWallets } from '../wallet'

type TransactionSortType = 'none' | 'newestFirst' | 'oldestFirst'

interface GetTransactionsParamsBase {
  userId: string
  providedWallets?: RetrievedWallet[] | undefined
  query?: QueryConstraint[] | undefined
  sortType?: TransactionSortType | undefined
}

type StructuredResult = Array<RetrievedWallet & { transactions: RetrievedTransaction[] }>

// Function overloads for different return types based on dataFormat
// When dataFormat is 'flat' or undefined (defaults to 'flat'), return flat array
export default async function getTransactions(
  params: GetTransactionsParamsBase & { dataFormat?: 'flat' | undefined },
): Promise<RetrievedTransaction[]>
// When dataFormat is explicitly 'structured', return structured array
export default async function getTransactions(
  params: GetTransactionsParamsBase & { dataFormat: 'structured' },
): Promise<StructuredResult>
// Implementation signature - this is what actually runs
// Must be compatible with all overloads above
export default async function getTransactions({
  userId,
  providedWallets = [],
  query = [],
  dataFormat = 'flat',
  sortType = 'none',
}: GetTransactionsParamsBase & {
  dataFormat?: 'flat' | 'structured' | undefined
}): Promise<RetrievedTransaction[] | StructuredResult> {
  let wallets = providedWallets
  if (!wallets.length) {
    wallets = await getWallets(userId) // default to all of the wallets
  }

  const promises = wallets.map(async (wallet) => {
    const transactionsCollectionRef = collection(
      db,
      `users/${userId}/wallets/${wallet.id}/transactions`,
    )
    const transactionsQuery = firebaseQuery(transactionsCollectionRef, ...query)
    const querySnapshot = await getDocs(transactionsQuery)

    if (querySnapshot.empty) {
      return {
        ...wallet,
        transactions: [],
      }
    }

    // Using toDate() to make it easier to convert the data to an actual JS Date obj on the client
    const transactions: RetrievedTransaction[] = querySnapshot.docs.map((doc) => {
      const data = doc.data() as StoredTransaction
      return {
        ...data,
        date: (data.date as Timestamp).toDate(),
        createdAt: (data.createdAt as Timestamp).toDate(),
        id: doc.id,
      } as RetrievedTransaction
    })

    return {
      ...wallet,
      transactions,
    }
  })

  try {
    const transactionsByWallet = await Promise.all(promises)

    if (dataFormat === 'flat') {
      const transactions = transactionsByWallet.flatMap(
        (wallet) => wallet.transactions,
      )

      // Sorting here, since the db structure doesn't allow for proper sorting with the orderBy clause
      const sortedTransactions =
        sortType === 'newestFirst'
          ? transactions.sort((a, b) => b.date.getTime() - a.date.getTime())
          : sortType === 'oldestFirst'
            ? transactions.sort((a, b) => a.date.getTime() - b.date.getTime())
            : transactions

      return sortedTransactions
    } else {
      // To do: implement sorting for the structured dataFormat (if needed)
      return transactionsByWallet as StructuredResult
    }
  } catch (error) {
    throw new Error('Error fetching transactions', { cause: error })
  }
}
