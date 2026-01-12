import { getTransactions } from '#/services/firebase/db/transaction'
import { calculateBalance } from '#/utils/charts'
import { convertTransactionsToPreferredCurrency } from '../currency'

// Get a specific balance
export default async function getBalance({
  userId,
  wallets,
  query,
  preferredCurrency,
  providedBaseCurrency = null,
}) {
  // Fetch the transactions
  const transactions = await getTransactions({
    userId,
    providedWallets: wallets,
    query,
  })
  if (!transactions.length) return 0

  // Convert to preferred currency
  await convertTransactionsToPreferredCurrency(
    transactions,
    preferredCurrency,
    providedBaseCurrency,
  )

  // Calculate, format and return the amount
  return parseFloat(calculateBalance(transactions).toFixed(2))
}
