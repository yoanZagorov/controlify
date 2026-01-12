import { where } from 'firebase/firestore'

import { getCurrencies } from '#/services/firebase/db/currency'

// Fetch the needed currency rates all at once
// Entities could be either wallets or transactions
export default async function getNonBaseCurrenciesRates({
  baseCurrency,
  entities = [],
  preferredCurrency = null,
}) {
  // Create a Set of unique currencies
  const nonBaseCurrenciesSet = new Set()
  entities.forEach((entity) => {
    if (entity.currency !== baseCurrency.code) {
      nonBaseCurrenciesSet.add(entity.currency)
    }
  })

  // Include the preferred currency if it's provided (so it's needed) and it's different from the base
  if (preferredCurrency && preferredCurrency !== baseCurrency.code) {
    nonBaseCurrenciesSet.add(preferredCurrency)
  }

  // Create currency lookup table
  let nonBaseCurrenciesRates = {}
  if (nonBaseCurrenciesSet.size) {
    const nonBaseCurrenciesQuery = [
      where('code', 'in', [...nonBaseCurrenciesSet]),
    ]
    const nonBaseCurrencies = await getCurrencies(nonBaseCurrenciesQuery)
    // Turn the array into a lookup table
    nonBaseCurrenciesRates = Object.fromEntries(
      nonBaseCurrencies.map((currency) => [
        currency.code,
        currency.conversionRate,
      ]),
    )
  }

  return nonBaseCurrenciesRates
}
