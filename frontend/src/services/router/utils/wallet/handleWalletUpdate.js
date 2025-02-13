import getDataToChange from "../getDataToChange";
import { formatEntityNameForFirebase } from "@/utils/formatting";
import { doc, runTransaction, writeBatch } from "firebase/firestore";
import { createErrorResponse, createSuccessResponse } from "../../responses";
import { ValidationError } from "@/utils/errors";
import { db } from "@/services/firebase/firebase.config";
import { getTransactions } from "@/services/firebase/db/transaction";
import { getEntity } from "@/services/firebase/db/utils/entity";
import { validateColor, validateCurrency, validateWalletData, validateWalletName, validateWalletVisibleCategories } from "@/utils/validation";
import checkWalletNameDuplicate from "./checkWalletNameDuplicate";
import validateAmount from "@/utils/validation/validateAmount";
import { COLORS, VALIDATION_RULES } from "@/constants";
import { getCurrencies } from "@/services/firebase/db/currency";
import getConvertedWalletBalance from "./getConvertedWalletBalance";
import { isObjTruthy } from "@/utils/obj";
import handleActionError from "../handleActionError";

export default async function handleWalletUpdate(userId, walletId, formData) {
  // Normalize data
  formData.categories = JSON.parse(formData.categories);
  formData.name = formatEntityNameForFirebase(formData.name);
  const { name, currency, categories, color } = formData;

  try {
    // Get the old data
    const walletDocRef = doc(db, `users/${userId}/wallets/${walletId}`);
    const oldWalletData = await getEntity(walletDocRef, walletId, "wallet");

    // Turn categories array to a map
    const categoriesVisibilityMap = Object.fromEntries(categories.map(category => [category.id, category.isVisible]))

    const hasDataChanged = {
      name: oldWalletData.name !== name,
      currency: oldWalletData.currency !== currency,
      color: oldWalletData.color !== color,
      categoriesVisibility: JSON.stringify(oldWalletData.categoriesVisibility) !== JSON.stringify(categoriesVisibilityMap) // To do (Non-MVP): do a more sophisticated array comparison
    }

    const batch = writeBatch(db);

    // Name validation
    if (hasDataChanged.name) {
      validateWalletName(formData.name);
      await checkWalletNameDuplicate(userId, name);
    }

    if (hasDataChanged.currency) {
      // Currency validation
      const supportedCurrencies = await getCurrencies();
      validateCurrency(currency, supportedCurrencies.map(currency => currency.code));

      // Convert current wallet balance and update it since currency has changed
      const convertedBalance = await getConvertedWalletBalance(oldWalletData.currency, currency, oldWalletData.balance, supportedCurrencies)
      batch.update(walletDocRef, { balance: convertedBalance });
    }

    // Categories validation
    if (hasDataChanged.categoriesVisibility) {
      validateWalletVisibleCategories(categories);
    }

    // Color validation
    if (hasDataChanged.color) {
      validateColor(color, COLORS.ENTITIES.WALLET_COLORS);
    }

    // Updating the wallet field on each transaction to keep in sync 
    const allWalletTransactions = await getTransactions({ userId, providedWallets: [oldWalletData] });
    allWalletTransactions.forEach(transaction => {
      const transactionDocRef = doc(db, `users/${userId}/wallets/${walletId}/transactions/${transaction.id}`);

      // It's okay to update these fields because they're purely presentational but not the currency - it makes more sense to keep it like this  
      let updates = {};
      if (hasDataChanged.name) updates["wallet.name"] = name;
      if (hasDataChanged.color) updates["wallet.color"] = color;

      if (isObjTruthy(updates)) {
        batch.update(transactionDocRef, updates);
      }
    });

    // Format the form data so there is no need to create a new obj
    delete formData.intent;
    delete formData.categories;
    formData.categoriesVisibility = categoriesVisibilityMap

    // Update the wallet itself
    const walletUpdatePayload = getDataToChange(hasDataChanged, formData);
    batch.update(walletDocRef, walletUpdatePayload);

    // Commit all updates
    await batch.commit();

    return createSuccessResponse({
      msg: "Successfully updated wallet settings data!",
      msgType: "success",
    })
  } catch (error) {
    return handleActionError(error, "Couldn't create your wallet. Please try again");
  }
}