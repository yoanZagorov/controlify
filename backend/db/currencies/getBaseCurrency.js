import { db } from '../../firebase.config.js'

export default async function getBaseCurrency() {
  try {
    const currenciesRef = db.collection('currencies')
    const currenciesQuery = currenciesRef.where('isBase', '==', true)
    const snapshot = await currenciesQuery.get()

    const baseCurrencyDoc = snapshot.docs[0]
    const baseCurrency = {
      ...baseCurrencyDoc.data(),
      id: baseCurrencyDoc.id,
    }

    return baseCurrency
  } catch (error) {
    throw new Error('Error fetching base currency', { cause: error })
  }
}
