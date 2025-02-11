import { formatEntityNameForFirebase } from "@/utils/formatting";
import { createErrorResponse, createSuccessResponse } from "../../responses";
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
  const { name, initialBalance: initialBalanceStr, currency, categories: unparsedCategories, color } = formData;

  try {
    // Name valdation
    validateWalletName(name);
    const formattedName = formatEntityNameForFirebase(name);
    await checkWalletNameDuplicate(userId, formattedName);

    // Initial balance validation
    const initialBalance = Number(initialBalanceStr);
    validateAmount(initialBalance, VALIDATION_RULES.WALLET.INITIAL_BALANCE.MIN_AMOUNT, VALIDATION_RULES.WALLET.INITIAL_BALANCE.MAX_AMOUNT, "initial balance");

    // Currency validation
    const supportedCurrencyCodes = (await getCurrencies()).map(currency => currency.code);
    validateCurrency(currency, supportedCurrencyCodes);

    // Categories validation
    const categories = JSON.parse(unparsedCategories);
    validateWalletVisibleCategories(categories);
    // Color validation
    validateColor(color, COLORS.ENTITIES.WALLET_COLORS);

    const walletSubmissionPayload = {
      name: formattedName,
      balance: initialBalance,
      categories,
      currency,
      color
    }

    const batch = writeBatch(db);

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
      const otherCategoryQuery = [
        where("name", "==", "other"),
        where("type", "==", "income")
      ]
      const otherIncomeCategory = (await getCategories(userId, otherCategoryQuery))[0];
      const { rootCategoryId, createdAt: otherIncomeCategoryCA, ...transactionCategoryPayload } = otherIncomeCategory;

      const transactionWalletPayload = {
        id: walletDocRef.id,
        name: formattedName,
        iconName: "wallet",
        currency,
        color,
        deletedAt: null,
      }

      const transactionDocRef = doc(collection(walletDocRef, "transactions"));
      batch.set(transactionDocRef, {
        amount: initialBalance,
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