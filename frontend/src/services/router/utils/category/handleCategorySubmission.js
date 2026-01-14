import {
  collection,
  doc,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore'

import { COLORS, ICON_NAMES, VALIDATION_RULES } from '#/constants'
import { db } from '#/services/firebase/firebase.config'
import { getActiveWallets } from '#/services/firebase/db/wallet'
import { formatEntityNameForFirebase } from '#/utils/formatting'
import {
  validateCategoryType,
  validateColor,
  validateEntityName,
  validateIconName,
} from '#/utils/validation'

import { createSuccessResponse } from '../../responses'
import handleActionError from '../handleActionError'
import checkCategoryNameDuplicate from './checkCategoryNameDuplicate'

export default async function handleCategorySubmission(userId, formData) {
  // Normalize the data
  formData.name = formData.name.trim()
  formData.type = formData.type.toLowerCase()
  const { name, type, iconName, color } = formData

  try {
    // Name validation
    validateEntityName({
      name,
      entity: 'category',
      minLength: VALIDATION_RULES.CATEGORY.NAME.MIN_LENGTH,
      maxLength: VALIDATION_RULES.CATEGORY.NAME.MAX_LENGTH,
      regex: VALIDATION_RULES.CATEGORY.NAME.REGEX,
    })
    const formattedName = formatEntityNameForFirebase(name)
    await checkCategoryNameDuplicate(userId, formattedName)

    // Type validation
    validateCategoryType(type)

    // Icon validation
    validateIconName(iconName, ICON_NAMES.CATEGORIES)

    // Color validation
    validateColor(color, COLORS.ENTITIES.CATEGORY_COLORS)

    // Write to the db
    const batch = writeBatch(db)

    const newCategoryPayload = {
      name: formattedName,
      type,
      iconName,
      color,
      createdAt: serverTimestamp(),
    }

    // Create the category
    const newCategoryDocRef = doc(collection(db, `users/${userId}/categories`))
    batch.set(newCategoryDocRef, newCategoryPayload)

    // Update the categories visibility field on each active wallet
    const activeWallets = await getActiveWallets(userId)
    activeWallets.forEach((wallet) => {
      const walletDocRef = doc(db, `users/${userId}/wallets/${wallet.id}`)
      batch.update(walletDocRef, {
        [`categoriesVisibility.${newCategoryDocRef.id}`]: true,
      }) // Updating only the specific field of the map
    })

    await batch.commit()

    return createSuccessResponse({
      msg: 'Successfully created your category!',
      msgType: 'success',
    })
  } catch (error) {
    return handleActionError(
      error,
      "Couldn't create your category. Please try again",
    )
  }
}
