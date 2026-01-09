import { collection, doc, serverTimestamp, writeBatch } from "firebase/firestore";

import { VALIDATION_RULES } from "#constants";

import { createSuccessResponse } from "../../responses";

import { db } from "#services/firebase/firebase.config";
import { getEntity } from "#services/firebase/db/utils/entity";
import { getCategory } from "#services/firebase/db/category";

import { performDecimalCalculation } from "#utils/number";
import { validateTransactionDate } from "#utils/validation";
import validateAmount from "#utils/validation/validateAmount";
import { ValidationError } from "#utils/errors";

import handleActionError from "../handleActionError";

export default async function handleTransactionSubmission(userId, formData) {
  // Normalize the data
  formData.amount = Number(formData.amount);
  formData.date = new Date(formData.date);
  const { amount, walletId, categoryId, date } = formData;

  try {
    // Amount validation
    validateAmount(amount, VALIDATION_RULES.TRANSACTION.AMOUNT.MIN_AMOUNT, VALIDATION_RULES.TRANSACTION.AMOUNT.MAX_AMOUNT, "transaction amount");

    // Wallet validation
    if (!walletId) throw new ValidationError("Wallet should not be empty");

    // Category validation
    if (!categoryId) throw new ValidationError("Category should not be empty");

    // Date validation
    validateTransactionDate(date)

    // Get neccessary entity data
    // Using rest syntax to exclude unneeded properties by destructuring them
    const { type, rootCategoryId, createdAt: categoryCA, ...transactionCategoryPayload } = await getCategory(userId, categoryId,);

    // Using getEntity instead of getWallet because the walletDocRef is used more than once
    const walletDocRef = doc(db, `users/${userId}/wallets/${walletId}`);
    const { currency, balance, categoriesVisibility, isDefault, createdAt: walletCA, ...transactionWalletPayload } = await getEntity(walletDocRef, walletId, "wallet");

    const batch = writeBatch(db);

    // Update wallet balance
    const operator = type === "expense" ? "-" : "+"
    const updatedWalletBalance = performDecimalCalculation(balance, amount, operator);
    batch.update(walletDocRef, { balance: updatedWalletBalance });

    // Add the transaction
    // The currency and type fields are stored as main fields, regardless of the fact they're just derived from the wallet and category. See the docs for more info
    const transactionDocRef = doc(collection(walletDocRef, "transactions"));
    batch.set(transactionDocRef, {
      amount,
      currency,
      type,
      date,
      wallet: transactionWalletPayload,
      category: transactionCategoryPayload,
      createdAt: serverTimestamp(),
    })

    await batch.commit();

    return createSuccessResponse({
      msg: "Transaction successful!",
      msgType: "success",
    })

  } catch (error) {
    return handleActionError(error, "Couldn't complete your transaction. Please try again");
  }
}