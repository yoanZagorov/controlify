import { db } from "@/services/firebase/firebase.config";
import { doc, writeBatch } from "firebase/firestore";
import { createSuccessResponse } from "../../responses";
import { getEntity } from "@/services/firebase/db/utils/entity";
import { performDecimalCalculation } from "@/utils/number";
import handleActionError from "../handleActionError";

export default async function handleTransactionDeletion(userId, formData) {
  // Normalize data
  formData.amount = Number(formData.amount);
  const { amount, walletId, transactionId } = formData;

  try {
    const batch = writeBatch(db);

    // Update wallet balance
    const transactionDocRef = doc(db, `users/${userId}/wallets/${walletId}/transactions/${transactionId}`);
    const { category: { type } } = await getEntity(transactionDocRef, transactionId, "transaction");

    const walletDocRef = doc(db, `users/${userId}/wallets/${walletId}`);
    const { balance: oldWalletBalance } = await getEntity(walletDocRef, walletId, "wallet");

    const operator = type === "expense" ? "+" : "-"
    const updatedWalletBalance = performDecimalCalculation(oldWalletBalance, amount, operator);
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