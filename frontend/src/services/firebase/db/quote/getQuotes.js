import { collection } from 'firebase/firestore'

import { getEntities } from '#/services/firebase/db/utils/entity'
import { db } from '#/services/firebase/firebase.config'

// Get all of the quotes
export default async function getQuotes(query) {
  const quotesCollectionRef = collection(db, 'quotes')
  return await getEntities(quotesCollectionRef, 'quotes', query)
}
