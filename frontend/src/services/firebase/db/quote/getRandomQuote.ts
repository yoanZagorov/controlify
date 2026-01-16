import { collection } from 'firebase/firestore'

import { HTTP_STATUS_CODES } from '#/constants'
import type { RetrievedQuote } from '#/types/models/Quote'
import { db } from '#/services/firebase/firebase.config'
import { getRandomDocQuery } from '#/services/firebase/db/utils/query'

import getQuotes from './getQuotes'

// Helper to check if error is a StatusCodeError with NOT_FOUND
function isNotFoundError(error: unknown): boolean {
  return (
    error !== null &&
    typeof error === 'object' &&
    'cause' in error &&
    error.cause !== null &&
    typeof error.cause === 'object' &&
    'statusCode' in error.cause &&
    error.cause.statusCode === HTTP_STATUS_CODES.NOT_FOUND
  )
}

// Get a random quote
export default async function getRandomQuote(): Promise<RetrievedQuote> {
  const quotesCollectionRef = collection(db, 'quotes')
  const [randomQuoteDocQuery, fallback] =
    await getRandomDocQuery(quotesCollectionRef)

  // If the first query failed (was empty), getQuotes(getEntities) will throw an error
  // To avoid breaking the app - catch it here and return the fallback. If the error was of any other type - just rethrow it
  try {
    const randomQuoteDoc = (await getQuotes(randomQuoteDocQuery))[0]
    if (!randomQuoteDoc) {
      throw new Error('No quotes found')
    }
    return randomQuoteDoc
  } catch (error) {
    if (isNotFoundError(error)) {
      const fallbackQuote = (await getQuotes(fallback))[0]
      if (!fallbackQuote) {
        throw new Error('No quotes found')
      }
      return fallbackQuote
    }
    throw error
  }
}
