import { createNewWallet } from "@/services/firebase/db/wallet";
import { formatEntityNameForFirebase } from "@/utils/formatting";
import { createErrorResponse, createSuccessResponse } from "../../responses";
import { getCurrencies } from "@/services/firebase/db/currency";
import { validateColor, validateCurrency, validateWalletInitialBalance, validateWalletName, validateWalletVisibleCategories } from "@/utils/validation";
import checkWalletNameDuplicate from "./checkWalletNameDuplicate";
import { COLORS } from "@/constants";
import { collection, doc, serverTimestamp, where, writeBatch } from "firebase/firestore";
import { getCategories, getCategory } from "@/services/firebase/db/category";
import { db } from "@/services/firebase/firebase.config";

export default async function handleWalletSubmission(userId, formData) {
  const { name, initialBalance: initialBalanceStr, currency, categories: unparsedCategories, color } = formData;

  try {
    // Name valdation
    validateWalletName(name);
    const formattedName = formatEntityNameForFirebase(name);
    await checkWalletNameDuplicate(userId, formattedName);

    // Initial balance validation
    const initialBalance = Number(initialBalanceStr);
    validateWalletInitialBalance(initialBalance);

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

    // await createNewWallet(userId, walletSubmissionPayload);

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
      const { rootCategoryId, createdAt: otherIncomeCategoryCA, ...transactionCategoryPayload } = otherIncomeCategory; // Using rest syntax to exclude unneeded properties by destructuring them

      const { balance, categories, isDefault, createdAt: walletCA, ...restOfWalletSubmissionPayload } = walletSubmissionPayload;
      const transactionWalletPayload = {
        iconName: "wallet",
        deletedAt: null,
        id: walletDocRef.id,
        ...restOfWalletSubmissionPayload,
      }

      const transactionDocRef = doc(collection(walletDocRef, "transactions"));
      batch.set(transactionDocRef, {
        amount: initialBalance,
        category: transactionCategoryPayload,
        createdAt: serverTimestamp(),
        date: serverTimestamp(),
        wallet: transactionWalletPayload
      })
    }

    await batch.commit();

    return createSuccessResponse({
      msg: "Successfully created your wallet!",
      msgType: "success",
    })

  } catch (error) {
    console.error(error);

    // A defined status code means an explicitly thrown specific StatusCodeError which means that there is a specifi message which should be returned
    if (error.statusCode) {
      return createErrorResponse(error.message, error.statusCode);
    }

    // A generic fallback error
    return createErrorResponse("Couldn't create your wallet. Please try again");
  }
}