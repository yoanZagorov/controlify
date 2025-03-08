import { doc, writeBatch } from "firebase/firestore";

import { VALIDATION_RULES } from "@/constants";

import { createSuccessResponse } from "../../responses";

import { db } from "@/services/firebase/firebase.config";
import { getEntity } from "@/services/firebase/db/utils/entity";

import validateAmount from "@/utils/validation/validateAmount";
import { getCategory } from "@/services/firebase/db/category";
import { ValidationError } from "@/utils/errors";
import { validateTransactionDate } from "@/utils/validation";
import { performDecimalCalculation } from "@/utils/number";
import { compareDatesByDay } from "@/utils/date";

import { getConvertedAmount } from "../currency";
import getDataToChange from "../getDataToChange";
import handleActionError from "../handleActionError";

export default async function handleTransactionUpdate(userId, formData) {
  // Normalize data
  formData.amount = Number(formData.amount);
  formData.date = new Date(formData.date);
  const { amount, walletId, categoryId, date, transactionId } = formData;

  try {
    // Transaction id checks
    // Throwing a normal error since this most likely isn't user's fault and it would be better to return a generic error msg
    if (!transactionId) throw new Error("Transaction id should not be empty");

    // Get the old data
    // Used getEntity instead of getTransaction since using the docRef more than once
    const transactionDocRef = doc(db, `users/${userId}/wallets/${walletId}/transactions/${transactionId}`);
    const oldTransactionData = await getEntity(transactionDocRef, transactionId, "transaction");

    // See what has changed
    const hasDataChanged = {
      amount: oldTransactionData.amount !== amount,
      wallet: oldTransactionData.wallet.id !== walletId,
      category: oldTransactionData.category.id !== categoryId,
      date: !compareDatesByDay(oldTransactionData.date.toDate(), date, "===")
    }

    const batch = writeBatch(db);

    if (hasDataChanged.amount) {
      // Amount validation
      validateAmount(amount, VALIDATION_RULES.TRANSACTION.AMOUNT.MIN_AMOUNT, VALIDATION_RULES.TRANSACTION.AMOUNT.MAX_AMOUNT, "transaction amount");

      // Update wallet balance if amount has changed
      const walletDocRef = doc(db, `users/${userId}/wallets/${walletId}`);
      const { balance: oldWalletBalance, currency: walletCurrency } = await getEntity(walletDocRef, walletId, "wallet");

      // Convert the transaction amount difference (if needed)
      let amountDifference = amount - oldTransactionData.amount;
      if (oldTransactionData.currency !== walletCurrency) {
        amountDifference = await getConvertedAmount(oldTransactionData.currency, walletCurrency, amountDifference);
      }

      // If it's an expense, deduct the difference. If it's income, add the difference.
      const updatedWalletBalance = oldTransactionData.type === "expense"
        ? performDecimalCalculation(oldWalletBalance, amountDifference, "-")
        : performDecimalCalculation(oldWalletBalance, amountDifference, "+");

      batch.update(walletDocRef, { balance: updatedWalletBalance });
    }

    // Wallet validation
    if (!walletId) throw new ValidationError("Wallet should not be empty")
    if (hasDataChanged.wallet) {
      // The wallet should never change
      throw new ValidationError("You can't change the wallet of a transaction");
    }

    // Get the new category payload (if needed)
    let categoryTransactionPayload = oldTransactionData.category;
    if (hasDataChanged.category) {
      // Category validation
      if (!categoryId) throw new ValidationError("Category should not be empty");
      // Destructure properties that aren't needed in the payload
      const { type, rootCategoryId, createdAt: categoryCA, ...restOfNewCategory } = await getCategory(userId, categoryId);
      categoryTransactionPayload = restOfNewCategory;

      // Category can change but only to one of the same type - the type should never change
      if (oldTransactionData.type !== type) {
        throw new ValidationError("You can't change the type of a transaction");
      }
    }

    // Date checks
    if (hasDataChanged.date) validateTransactionDate(date);

    // Get only the updated data payload
    const transactionUpdatePayload = getDataToChange(hasDataChanged, { amount, category: categoryTransactionPayload, date });

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