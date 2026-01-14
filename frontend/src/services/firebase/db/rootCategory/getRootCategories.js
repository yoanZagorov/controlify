import { collection } from 'firebase/firestore'

import { db } from '../../firebase.config'
import { getEntities } from '../utils/entity'

// Get the default app categories
export default async function getRootCategories(query) {
  const rootCategoriesCollectionRef = collection(db, 'categories')
  return await getEntities(rootCategoriesCollectionRef, 'categories', query)
}
