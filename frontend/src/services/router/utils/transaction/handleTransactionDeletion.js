import { db } from "@/services/firebase/firebase.config";
import { doc, writeBatch } from "firebase/firestore";
import { createSuccessResponse } from "../../responses";
import { getEntity } from "@/services/firebase/db/utils/entity";
import { performDecimalCalculation } from "@/utils/number";
import handleActionError from "../handleActionError";
import { getConvertedAmount } from "../currency";

export default async function handleTransactionDeletion(userId, formData) {
  // Normalize data
  formData.amount = Number(formData.amount);
  const { amount, walletId, transactionId } = formData;

  try {
    const batch = writeBatch(db);

    // Update wallet balance
    const transactionDocRef = doc(db, `users/${userId}/wallets/${walletId}/transactions/${transactionId}`);
    const { type, currency } = await getEntity(transactionDocRef, transactionId, "transaction");

    const walletDocRef = doc(db, `users/${userId}/wallets/${walletId}`);
    const { balance: oldWalletBalance, currency: walletCurrency } = await getEntity(walletDocRef, walletId, "wallet");

    // Convert the transaction amount (if needed)
    let correctAmount = amount;
    if (currency !== walletCurrency) {
      correctAmount = await getConvertedAmount(currency, walletCurrency, amount);
    }

    const operator = type === "expense" ? "+" : "-"
    const updatedWalletBalance = performDecimalCalculation(oldWalletBalance, correctAmount, operator);
    batch.update(walletDocRef, { balance: updatedWalletBalance });

    // Delete the transaction
    batch.delete(transactionDocRef);

    await batch.commit();

    return createSuccessResponse({
      msg: "Transaction deleted successfully!",
      msgType: "success",
    })
  } catch (error) {
    return handleActionError(error, "Couldn't delete your transaction. Please try again");
  }
}