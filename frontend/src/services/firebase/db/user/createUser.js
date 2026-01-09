import {
  collection,
  doc,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore'

import { COLORS } from '#constants'

import { db } from '#services/firebase/firebase.config'
import { getUserDefaultCurrency } from '#services/location'

import { getBaseCurrency } from '../currency'
import { getRootCategories } from '../rootCategory'

// Create a user's account
export default async function createUser(userId, email, fullName) {
  try {
    // To do: get the default user currency through the Geolocation API
    const defaultCurrency =
      getUserDefaultCurrency() || (await getBaseCurrency()).code

    const defaultCategories = await getRootCategories()

    const batch = writeBatch(db)

    // Set user doc
    const userDocRef = doc(db, `users/${userId}`)
    batch.set(userDocRef, {
      email,
      fullName,
      profilePic: null,
      currency: defaultCurrency,
      createdAt: serverTimestamp(),
    })

    // Set user categories collection
    const categoriesCollectionRef = collection(db, `users/${userId}/categories`) // Defined outside of the loop to avoid multiple collection() calls
    let walletCategoriesVisibilityMap = {} // Using a map for faster lookups

    // ...rest allows to get all properties, apart from the destructured one
    defaultCategories.forEach(({ id, ...rest }) => {
      const categoryDocRef = doc(categoriesCollectionRef)
      batch.set(categoryDocRef, {
        ...rest,
        createdAt: serverTimestamp(),
        rootCategoryId: id,
      })

      walletCategoriesVisibilityMap[categoryDocRef.id] = true
    })

    // Set user default wallet doc
    const walletDocRef = doc(collection(db, `users/${userId}/wallets`))
    batch.set(walletDocRef, {
      name: 'default',
      balance: 0,
      currency: defaultCurrency,
      iconName: 'wallet',
      isDefault: true,
      color: COLORS.ENTITIES.DEFAULT_WALLET_COLOR,
      categoriesVisibility: walletCategoriesVisibilityMap,
      createdAt: serverTimestamp(),
      deletedAt: null,
    })

    await batch.commit()
  } catch (error) {
    throw new Error("Couldn't create the user's Firestore account", {
      cause: error,
    })
  }
}
