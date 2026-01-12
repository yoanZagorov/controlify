import { performDecimalCalculation } from '#/utils/number'

import { convertWalletBalancesToPreferredCurrency } from '../currency'

// Consider allowing the function to fetch the data by itself if decide to use it in a context where the data won't be readily available (use getAllNeededConversionData)
export default async function getCurrentUserBalance(
  activeWallets,
  userCurrency,
  providedBaseCurrency = null,
) {
  let convertedActiveWallets = activeWallets // Ensuring no mutation of the original array
  // Perform currency conversions
  await convertWalletBalancesToPreferredCurrency(
    convertedActiveWallets,
    userCurrency,
    providedBaseCurrency,
  )

  // Sum the balance
  const balance = convertedActiveWallets.reduce(
    (acc, wallet) =>
      performDecimalCalculation(acc, wallet.convertedBalance, '+'),
    0,
  )

  return parseFloat(balance.toFixed(2))
}
