import { collection, doc, serverTimestamp, writeBatch } from "firebase/firestore";
import { createSuccessResponse } from "../../responses";
import { db } from "@/services/firebase/firebase.config";
import { getEntity } from "@/services/firebase/db/utils/entity";
import { performDecimalCalculation } from "@/utils/number";
import { validateTransactionData } from "@/utils/validation";
import handleActionError from "../handleActionError";

export default async function handleTransactionSubmission(userId, formData) {
  // Normalize data
  formData.amount = Number(formData.amount);
  formData.date = new Date(formData.date);
  const { amount, walletId, categoryId, date } = formData;

  try {
    validateTransactionData({ amount, walletId, categoryId, date });

    // Get neccessary entity data
    // Using rest syntax to exclude unneeded properties by destructuring them
    const categoryDocRef = doc(db, `users/${userId}/categories/${categoryId}`);
    const { type, rootCategoryId, createdAt: categoryCA, ...transactionCategoryPayload } = await getEntity(categoryDocRef, categoryId, "category");

    const walletDocRef = doc(db, `users/${userId}/wallets/${walletId}`);
    const { currency, balance, categoriesVisibility, isDefault, createdAt: walletCA, ...transactionWalletPayload } = await getEntity(walletDocRef, walletId, "wallet");

    const batch = writeBatch(db);

    // Update wallet balance
    const operator = transactionCategoryPayload.type === "expense" ? "-" : "+"
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