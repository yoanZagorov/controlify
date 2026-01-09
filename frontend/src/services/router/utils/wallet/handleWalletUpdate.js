import { doc, writeBatch } from 'firebase/firestore'

import { COLORS, VALIDATION_RULES } from '#constants'

import { createSuccessResponse } from '../../responses'

import { db } from '#services/firebase/firebase.config'
import { getTransactions } from '#services/firebase/db/transaction'
import { getEntity } from '#services/firebase/db/utils/entity'
import { getCurrencies } from '#services/firebase/db/currency'

import { isObjTruthy } from '#utils/obj'
import {
  validateColor,
  validateCurrency,
  validateEntityName,
  validateWalletVisibleCategories,
} from '#utils/validation'
import { formatEntityNameForFirebase } from '#utils/formatting'

import checkWalletNameDuplicate from './checkWalletNameDuplicate'
import handleActionError from '../handleActionError'
import { getConvertedAmount } from '../currency'
import getDataToChange from '../getDataToChange'

export default async function handleWalletUpdate(userId, walletId, formData) {
  // Normalize data
  formData.name = formatEntityNameForFirebase(formData.name.trim()) // Need to format it up here to be able to perform the check against the old data
  formData.categories = JSON.parse(formData.categories)
  const { name, currency, categories, color } = formData

  try {
    // Get the old data
    const walletDocRef = doc(db, `users/${userId}/wallets/${walletId}`)
    const oldWalletData = await getEntity(walletDocRef, walletId, 'wallet')

    // Turn categories array to a map
    const categoriesVisibilityMap = Object.fromEntries(
      categories.map((category) => [category.id, category.isVisible]),
    )

    // Check what has changed
    const hasDataChanged = {
      name: oldWalletData.name !== name,
      currency: oldWalletData.currency !== currency,
      color: oldWalletData.color !== color,
      categoriesVisibility:
        JSON.stringify(oldWalletData.categoriesVisibility) !==
        JSON.stringify(categoriesVisibilityMap), // To do: do a more sophisticated array comparison
    }

    const batch = writeBatch(db)

    // Name validation
    if (hasDataChanged.name) {
      validateEntityName({
        name,
        entity: 'wallet',
        minLength: VALIDATION_RULES.WALLET.NAME.MIN_LENGTH,
        maxLength: VALIDATION_RULES.WALLET.NAME.MAX_LENGTH,
        regex: VALIDATION_RULES.WALLET.NAME.REGEX,
      })
      await checkWalletNameDuplicate(userId, name)
    }

    if (hasDataChanged.currency) {
      // Currency validation
      const supportedCurrencies = await getCurrencies()
      validateCurrency(
        currency,
        supportedCurrencies.map((currency) => currency.code),
      )

      // Convert current wallet balance and update it since currency has changed
      const convertedBalance = await getConvertedAmount(
        oldWalletData.currency,
        currency,
        oldWalletData.balance,
        supportedCurrencies,
      )
      batch.update(walletDocRef, { balance: convertedBalance })
    }

    // Categories validation
    if (hasDataChanged.categoriesVisibility) {
      validateWalletVisibleCategories(categories) // Using the array since it's the original input and the validation is easier
    }

    // Color validation
    if (hasDataChanged.color) {
      validateColor(color, COLORS.ENTITIES.WALLET_COLORS)
    }

    // Updating the wallet field on each transaction to keep in sync
    const allWalletTransactions = await getTransactions({
      userId,
      providedWallets: [oldWalletData],
    })
    allWalletTransactions.forEach((transaction) => {
      const transactionDocRef = doc(
        db,
        `users/${userId}/wallets/${walletId}/transactions/${transaction.id}`,
      )

      // It's okay to update these fields because they're purely presentational but not the currency - it makes more sense to keep historical accuracy. See the docs for more info
      let updates = {}
      if (hasDataChanged.name) updates['wallet.name'] = name
      if (hasDataChanged.color) updates['wallet.color'] = color

      if (isObjTruthy(updates)) batch.update(transactionDocRef, updates)
    })

    // Format the form data so there is no need to create a new obj
    delete formData.intent
    delete formData.categories
    formData.categoriesVisibility = categoriesVisibilityMap

    // Update the wallet itself
    const walletUpdatePayload = getDataToChange(hasDataChanged, formData)
    batch.update(walletDocRef, walletUpdatePayload)

    // Commit all updates
    await batch.commit()

    return createSuccessResponse({
      msg: 'Successfully updated your wallet settings data!',
      msgType: 'success',
    })
  } catch (error) {
    return handleActionError(
      error,
      "Couldn't update your wallet. Please try again",
    )
  }
}
