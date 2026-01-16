import { where } from 'firebase/firestore'

import type { RetrievedCurrency } from '#/types/models/Currency'

import getCurrencies from './getCurrencies'

// Get the current base currency
export default async function getBaseCurrency(): Promise<RetrievedCurrency> {
  const baseCurrencyQuery = [where('isBase', '==', true)]

  const currencies = await getCurrencies(baseCurrencyQuery)
  if (!currencies[0]) {
    throw new Error('No base currency found')
  }
  return currencies[0]
}
