import { doc } from 'firebase/firestore'

import { db } from '#/services/firebase/firebase.config'

import { getEntity } from '../utils/entity'

// Get a single user category
export default async function getCategory(userId, categoryId) {
  const categoryDocRef = doc(db, `users/${userId}/categories/${categoryId}`)
  return await getEntity(categoryDocRef, categoryId, 'category')
}
