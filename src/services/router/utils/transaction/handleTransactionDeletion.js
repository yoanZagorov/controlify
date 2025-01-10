import { db } from "@/services/firebase/firebase.config";
import { doc, runTransaction } from "firebase/firestore";
import { createErrorResponse, createSuccessResponse } from "../../responses";
import { getEntity } from "@/services/firebase/db/utils/entity";
import { updateWalletBalance } from "@/services/firebase/db/wallet";

export default async function handleTransactionDeletion(userId, formData) {
  const { amount: amountStr } = formData;

  const formattedFormData = {
    ...formData,
    amount: Number(amountStr)
  }

  const { category: categoryId, wallet: walletId, transactionId } = formattedFormData;

  const categoryDocRef = doc(db, `users/${userId}/categories/${categoryId}`);
  const walletDocRef = doc(db, `users/${userId}/wallets/${walletId}`);
  const transactionDocRef = doc(db, `users/${userId}/wallets/${walletId}/transactions/${transactionId}`);

  const { type: categoryType } = (await getEntity(categoryDocRef, categoryId, "category"));
  const oldTransactionData = await getEntity(transactionDocRef, transactionId, "transaction");

  try {
    await runTransaction(db, async (dbTransaction) => {
      const correctAmount = categoryType === "expense" ? oldTransactionData.amount : -oldTransactionData.amount;
      await updateWalletBalance(dbTransaction, walletDocRef, correctAmount);

      dbTransaction.delete(transactionDocRef);
    })

    return createSuccessResponse({
      msg: "Transaction deleted successfully!",
      msgType: "success",
    })
  } catch (error) {
    console.error(error);

    return createErrorResponse(500, "Couldn't delete your transaction. Please try again");
  }
}