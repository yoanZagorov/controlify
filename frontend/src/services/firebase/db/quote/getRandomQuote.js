import { collection } from 'firebase/firestore'

import { HTTP_STATUS_CODES } from '#constants'

import { getRandomDocQuery } from '#services/firebase/db/utils/query'
import { db } from '#services/firebase/firebase.config'
import getQuotes from './getQuotes'

// Get a random quote
export default async function getRandomQuote() {
  const quotesCollectionRef = collection(db, 'quotes')
  const [randomQuoteDocQuery, fallback] =
    await getRandomDocQuery(quotesCollectionRef)

  // If the first query failed (was empty), getQuotes(getEntities) will throw an error
  // To avoid breaking the app - catch it here and return the fallback. If the error was of any other type - just rethrow it
  try {
    const randomQuoteDoc = (await getQuotes(randomQuoteDocQuery))[0]
    return randomQuoteDoc
  } catch (error) {
    if (error?.cause?.statusCode === HTTP_STATUS_CODES.NOT_FOUND) {
      return (await getQuotes(fallback))[0]
    } else {
      throw error
    }
  }
}
