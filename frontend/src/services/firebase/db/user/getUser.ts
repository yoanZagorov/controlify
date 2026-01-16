import { doc, type DocumentReference } from 'firebase/firestore'

import type { StoredUser, RetrievedUser } from '#/types/models/User'
import { db } from '#/services/firebase/firebase.config'
import { getEntity } from '#/services/firebase/db/utils/entity'
import { transformUserProfilePic } from '#/services/cloudinary'

export default async function getUser(userId: string): Promise<RetrievedUser> {
  // Type assertion is necessary because Firestore's path-based API is untyped.
  // The path 'users/{userId}' guarantees this is a User document.
  const userDocRef = doc(db, 'users', userId) as DocumentReference<StoredUser>
  const user = await getEntity<StoredUser>(userDocRef, userId, 'user')

  // Reduce size using Cloudinary transformations to improve performance
  if (user.profilePic) {
    transformUserProfilePic(user)
  }

  return user
}
