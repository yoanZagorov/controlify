import { formatEntityNameForFirebase } from "@/utils/formatting";
import { createSuccessResponse } from "../../responses";
import { getCurrencies } from "@/services/firebase/db/currency";
import { validateColor, validateCurrency, validateWalletName, validateWalletVisibleCategories } from "@/utils/validation";
import checkWalletNameDuplicate from "./checkWalletNameDuplicate";
import { COLORS, VALIDATION_RULES } from "@/constants";
import { collection, doc, serverTimestamp, where, writeBatch } from "firebase/firestore";
import { getCategories } from "@/services/firebase/db/category";
import { db } from "@/services/firebase/firebase.config";
import validateAmount from "@/utils/validation/validateAmount";
import handleActionError from "../handleActionError";

export default async function handleWalletSubmission(userId, formData) {
  // Normalize data
  formData.initialBalance = Number(formData.initialBalance);
  formData.categories = JSON.parse(formData.categories);
  const { name, initialBalance, currency, categories, color } = formData;

  try {
    // Name validation
    validateWalletName(formData.name);
    const formattedName = formatEntityNameForFirebase(name)
    await checkWalletNameDuplicate(userId, formattedName);

    // Initial balance validation
    validateAmount(initialBalance, VALIDATION_RULES.WALLET.INITIAL_BALANCE.MIN_AMOUNT, VALIDATION_RULES.WALLET.INITIAL_BALANCE.MAX_AMOUNT, "initial balance");

    // Currency validation
    const supportedCurrencyCodes = (await getCurrencies()).map(currency => currency.code);
    validateCurrency(currency, supportedCurrencyCodes);

    // Categories validation
    validateWalletVisibleCategories(categories);

    // Color validation
    validateColor(color, COLORS.ENTITIES.WALLET_COLORS)

    const walletSubmissionPayload = {
      name: formattedName,
      balance: initialBalance,
      categoriesVisibility: Object.fromEntries(categories.map(category => [category.id, category.isVisible])), // Turn to a map for easier lookups
      currency,
      color
    }

    const batch = writeBatch(db);

    // Merging default wallet initialization data with the submitted one
    const walletDocRef = doc(collection(db, `users/${userId}/wallets`));
    batch.set(walletDocRef, {
      iconName: "wallet",
      isDefault: false,
      createdAt: serverTimestamp(),
      deletedAt: null,
      ...walletSubmissionPayload
    })

    if (initialBalance > 0) {
      // Manually submit a transaction for the initial balance to include it in the calculations
      // The "Other" category is just a generic category used for uncategorizable incomes/expenses (depending on the type)
      const otherCategoryQuery = [
        where("name", "==", "other"),
        where("type", "==", "income")
      ];
      const otherIncomeCategory = (await getCategories(userId, otherCategoryQuery))[0];
      const { type, rootCategoryId, createdAt: otherIncomeCategoryCA, ...transactionCategoryPayload } = otherIncomeCategory;

      const transactionWalletPayload = {
        id: walletDocRef.id,
        name: formattedName,
        iconName: "wallet",
        color,
        deletedAt: null,
      }

      const transactionDocRef = doc(collection(walletDocRef, "transactions"));
      batch.set(transactionDocRef, {
        amount: initialBalance,
        type,
        currency,
        wallet: transactionWalletPayload,
        category: transactionCategoryPayload,
        date: serverTimestamp(),
        createdAt: serverTimestamp(),
      })
    }

    await batch.commit();

    return createSuccessResponse({
      msg: "Successfully created your wallet!",
      msgType: "success",
    })

  } catch (error) {
    return handleActionError(error, "Couldn't create your wallet. Please try again");
  }
}