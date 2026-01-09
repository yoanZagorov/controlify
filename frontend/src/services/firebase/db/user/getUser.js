import { doc } from 'firebase/firestore'

import { db } from '#services/firebase/firebase.config'
import { getEntity } from '#services/firebase/db/utils/entity'
import { transformUserProfilePic } from '#services/cloudinary'

export default async function getUser(userId) {
  const userDocRef = doc(db, 'users', userId)
  const user = await getEntity(userDocRef, userId, 'user')

  // Reduce size using Cloudinary transformations to improve performance
  if (user.profilePic) {
    transformUserProfilePic(user)
  }

  return user
}
