import { doc, where, writeBatch } from 'firebase/firestore'

import { COLORS, ICON_NAMES, VALIDATION_RULES } from '#constants'

import { createSuccessResponse } from '../../responses'

import { getTransactions } from '#services/firebase/db/transaction'
import { getEntity } from '#services/firebase/db/utils/entity'
import { db } from '#services/firebase/firebase.config'
import { getActiveWallets } from '#services/firebase/db/wallet'

import { ValidationError } from '#utils/errors'
import { formatEntityNameForFirebase } from '#utils/formatting'
import {
  validateColor,
  validateEntityName,
  validateIconName,
} from '#utils/validation'

import getDataToChange from '../getDataToChange'
import checkCategoryNameDuplicate from './checkCategoryNameDuplicate'
import handleActionError from '../handleActionError'

export default async function handleCategoryUpdate(userId, formData) {
  // Normalize data
  formData.name = formatEntityNameForFirebase(formData.name.trim()) // Need to format it up here to be able to perform the check against the old data
  formData.type = formData.type.toLowerCase()

  const { id, name, type, iconName, color } = formData

  try {
    // Get the old data
    const categoryDocRef = doc(db, `users/${userId}/categories/${id}`)
    const oldCategoryData = await getEntity(categoryDocRef, id, 'category')

    const hasDataChanged = {
      name: oldCategoryData.name !== name,
      type: oldCategoryData.type !== type,
      iconName: oldCategoryData.iconName !== iconName,
      color: oldCategoryData.color !== color,
    }

    if (hasDataChanged.type) {
      throw new ValidationError("You can't change the type of a category")
    }

    // Write to the db
    const batch = writeBatch(db)

    if (
      hasDataChanged.name ||
      hasDataChanged.iconName ||
      hasDataChanged.color
    ) {
      // Name validation
      if (hasDataChanged.name) {
        validateEntityName({
          name,
          entity: 'category',
          minLength: VALIDATION_RULES.CATEGORY.NAME.MIN_LENGTH,
          maxLength: VALIDATION_RULES.CATEGORY.NAME.MAX_LENGTH,
          regex: VALIDATION_RULES.CATEGORY.NAME.REGEX,
        })
        await checkCategoryNameDuplicate(userId, formData.name)
      }

      // Icon validation
      if (hasDataChanged.iconName) {
        validateIconName(iconName, ICON_NAMES.CATEGORIES)
      }

      // Color validation
      if (hasDataChanged.color) {
        validateColor(color, COLORS.ENTITIES.CATEGORY_COLORS)
      }

      // Update the presentational fields on each active wallet transaction with this category
      const activeWallets = await getActiveWallets(userId)
      const transactionsQuery = [where('category.id', '==', id)]
      const transactions = await getTransactions({
        userId,
        providedWallets: activeWallets,
        query: transactionsQuery,
      })

      transactions.forEach((transaction) => {
        const transactionDocRef = doc(
          db,
          `users/${userId}/wallets/${transaction.wallet.id}/transactions/${transaction.id}`,
        )
        // Updating only the relevant fields
        batch.update(transactionDocRef, {
          ...(hasDataChanged.name ? { 'category.name': name } : {}),
          ...(hasDataChanged.iconName ? { 'category.iconName': iconName } : {}),
          ...(hasDataChanged.color ? { 'category.color': color } : {}),
        })
      })
    }

    // Format the original formData object
    delete formData.id
    delete formData.intent
    delete formData.type

    const dataToChange = getDataToChange(hasDataChanged, formData)
    batch.update(categoryDocRef, dataToChange)

    await batch.commit()

    return createSuccessResponse({
      msg: `Successfully updated your category!`,
      msgType: 'success',
    })
  } catch (error) {
    return handleActionError(
      error,
      "Couldn't update your category. Please try again",
    )
  }
}
