import { doc, writeBatch } from "firebase/firestore";
import { createSuccessResponse } from "../../responses";
import { ValidationError } from "@/utils/errors";
import { db } from "@/services/firebase/firebase.config";
import { getEntity } from "@/services/firebase/db/utils/entity";
import getDataToChange from "../getDataToChange";
import { validateTransactionData } from "@/utils/validation";
import { performDecimalCalculation } from "@/utils/number";
import { compareDatesByDay } from "@/utils/date";
import handleActionError from "../handleActionError";

export default async function handleTransactionUpdate(userId, formData) {
  // Normalize data
  formData.amount = Number(formData.amount);
  formData.date = new Date(formData.date);
  const { amount, walletId, categoryId, date, transactionId } = formData;

  try {
    // Primary validation
    validateTransactionData({ amount, walletId, categoryId, date, transactionId });

    // Get the old data
    const transactionDocRef = doc(db, `users/${userId}/wallets/${walletId}/transactions/${transactionId}`);
    const oldTransactionData = await getEntity(transactionDocRef, transactionId, "transaction");

    // See what has changed
    const hasDataChanged = {
      amount: oldTransactionData.amount !== amount,
      wallet: oldTransactionData.wallet.id !== walletId,
      category: oldTransactionData.category.id !== categoryId,
      date: !compareDatesByDay(oldTransactionData.date.toDate(), date, "===")
    }

    // Secondary validation
    // The wallet should never change
    if (hasDataChanged.wallet) {
      throw new ValidationError("You can't change the wallet of a transaction");
    }

    // Get the new category payload (if needed)
    let categoryTransactionPayload = oldTransactionData.category;
    if (hasDataChanged.category) {
      const categoryDocRef = doc(db, `users/${userId}/categories/${categoryId}`);
      const { rootCategoryId, createdAt: categoryCA, ...restOfNewCategory } = await getEntity(categoryDocRef, categoryId, "category");
      categoryTransactionPayload = restOfNewCategory;

      // Category can change but only to one of the same type - the type should never change
      if (oldTransactionData.type !== categoryTransactionPayload.type) {
        throw new ValidationError("You can't change the type of a transaction");
      }
    }

    // Get only the updated data payload
    const transactionUpdatePayload = getDataToChange(hasDataChanged, { amount, category: categoryTransactionPayload, date });

    const batch = writeBatch(db);

    // Update wallet balance if amount has changed
    if (hasDataChanged.amount) {
      const walletDocRef = doc(db, `users/${userId}/wallets/${walletId}`);
      const { balance: oldWalletBalance } = await getEntity(walletDocRef, walletId, "wallet");

      const amountDifference = amount - oldTransactionData.amount;

      // If it's an expense, deduct the difference. If it's income, add the difference.
      const updatedWalletBalance = categoryTransactionPayload.type === "expense"
        ? performDecimalCalculation(oldWalletBalance, amountDifference, "-")
        : performDecimalCalculation(oldWalletBalance, amountDifference, "+");

      batch.update(walletDocRef, { balance: updatedWalletBalance });
    }

    // Update the transaction
    batch.update(transactionDocRef, transactionUpdatePayload);

    await batch.commit();

    return createSuccessResponse({
      msg: "Transaction updated successfully!",
      msgType: "success",
    })

  } catch (error) {
    return handleActionError(error, "Couldn't update your transaction. Please try again");
  }
}