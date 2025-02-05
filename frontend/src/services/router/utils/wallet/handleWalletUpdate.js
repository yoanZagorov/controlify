import { checkWalletName, checkWalletNameDuplicate, getConvertedWalletBalance } from "@/utils/wallet";
import getDataToChange from "../getDataToChange";
import { formatEntityNameForFirebase } from "@/utils/formatting";
import { doc, runTransaction } from "firebase/firestore";
import { createErrorResponse, createSuccessResponse } from "../../responses";
import { ValidationError } from "@/utils/errors";
import { db } from "@/services/firebase/firebase.config";
import { getTransactions } from "@/services/firebase/db/transaction";
import { getEntity } from "@/services/firebase/db/utils/entity";
import { validateCurrency } from "@/utils/validation";
import { getConvertedAmount } from "@/utils/currency";

export default async function handleWalletUpdate(userId, walletDocRef, walletId, formData) {
  try {
    checkWalletName(formData.name);
    const formattedName = formatEntityNameForFirebase(formData.name);

    const formattedFormData = {
      ...formData,
      name: formattedName,
      categories: JSON.parse(formData.categories)
    }

    const { name, currency, color, categories } = formattedFormData;

    const wallet = await getEntity(walletDocRef, walletId, "wallet");
    const walletTransactions = await getTransactions({ userId, wallets: [wallet] });

    await runTransaction(db, async (transaction) => {
      const oldWalletData = (await transaction.get(walletDocRef)).data();

      const hasDataChanged = {
        name: oldWalletData.name !== name,
        currency: oldWalletData.currency !== currency,
        color: oldWalletData.color !== color,
        categories: true // To do: do a real array comparison
      }

      if (hasDataChanged.name) {
        await checkWalletNameDuplicate(userId, formattedName);
      }

      if (hasDataChanged.currency) {
        validateCurrency(currency);
        const convertedBalance = await getConvertedWalletBalance(oldWalletData.currency, currency, wallet.balance)
        transaction.update(walletDocRef, { balance: convertedBalance });
      }

      const dataToChange = getDataToChange(hasDataChanged, formattedFormData);

      transaction.update(walletDocRef, dataToChange);

      // Updating the wallet field on each transaction to keep in sync 
      walletTransactions.forEach(walletTransaction => {
        const transactionDocRef = doc(db, `users/${userId}/wallets/${walletId}/transactions/${walletTransaction.id}`);

        const updates = {};

        if (hasDataChanged.name) {
          updates["wallet.name"] = name;
        }

        if (hasDataChanged.color) {
          updates["wallet.color"] = color;
        }

        if (Object.keys(updates).length > 0) {
          transaction.update(transactionDocRef, updates);
        }
      });
    })

    return createSuccessResponse({
      msg: "Successfully updated wallet settings data!",
      msgType: "success",
    })
  } catch (error) {
    console.error(error);

    if (error instanceof ValidationError) {
      return createErrorResponse(error.message, error.statusCode);
    }

    return createErrorResponse(error.message);
  }
}