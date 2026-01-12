import { getBaseCurrency } from '#/services/firebase/db/currency'
import { convertAmountToPreferredCurrency } from '#/utils/currency'
import getNonBaseCurrenciesRates from './getNonBaseCurrenciesRates'

// If ended up converting the wallets, the baseCurrency and nonBaseCurrencyRates were most likely not readily unavailable. So they're directly fetched here
export default async function convertWalletBalancesToPreferredCurrency(
  wallets,
  preferredCurrency,
  providedBaseCurrency = null,
) {
  let baseCurrency = providedBaseCurrency
  if (!baseCurrency) {
    baseCurrency = await getBaseCurrency()
  }

  const nonBaseCurrenciesRates = await getNonBaseCurrenciesRates({
    baseCurrency,
    entities: wallets,
    preferredCurrency,
  })

  for (const wallet of wallets) {
    const { balance, currency } = wallet

    let convertedBalance = balance
    if (currency !== preferredCurrency) {
      convertedBalance = convertAmountToPreferredCurrency({
        amount: balance,
        currency,
        baseCurrency,
        preferredCurrency,
        nonBaseCurrenciesRates,
      })
    }

    wallet.convertedBalance = convertedBalance
  }
}
