import { collection } from 'firebase/firestore'
import { db } from '#/services/firebase/firebase.config'
import { getEntities } from '#/services/firebase/db/utils/entity'

// Get the current user categories
export default async function getCategories(userId, query) {
  const categoriesCollectionRef = collection(db, `users/${userId}/categories`)
  return await getEntities(categoriesCollectionRef, 'categories', query)
}
