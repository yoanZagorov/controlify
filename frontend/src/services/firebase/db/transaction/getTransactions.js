import { collection, getDocs, query as firebaseQuery } from 'firebase/firestore'

import { db } from '#/services/firebase/firebase.config'

import { getWallets } from '../wallet'

// Get transactions
// dataFormat
// "flat" -> all of the transactions are returned in a normal array, not grouped by wallet
// "structured" -> the transactions are returned in a 2-d array, grouped by wallet
export default async function getTransactions({
  userId,
  providedWallets = [],
  query = [],
  dataFormat = 'flat',
  sortType = 'none',
}) {
  let wallets = providedWallets
  if (!wallets) {
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
    const transactions = querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        date: doc.data().date.toDate(),
        createdAt: doc.data().createdAt.toDate(),
        id: doc.id,
      }
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
          ? transactions.sort((a, b) => b.date - a.date)
          : sortType === 'oldestFirst'
            ? transactions.sort((a, b) => a.date - b.date)
            : transactions

      return sortedTransactions
    } else {
      // To do: implement sorting for the structured dataFormat (if needed)
      return transactionsByWallet
    }
  } catch (error) {
    throw new Error('Error fetching transactions', { cause: error })
  }
}
