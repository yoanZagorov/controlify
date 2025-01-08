import { addTransaction } from "@/services/firebase/db/transaction";
import { updateWalletBalance } from "@/services/firebase/db/wallet";
import { validateTransactionData } from "@/utils/transaction";
import { collection, doc, runTransaction, Timestamp } from "firebase/firestore";
import { createErrorResponse, createSuccessResponse } from "../../responses";
import { ValidationError } from "@/utils/errors";
import { db } from "@/services/firebase/firebase.config";
import { getEntity } from "@/services/firebase/db/utils";

export default async function handleTransactionSubmission(userId, formData) {
  const { amount: amountStr, date: dateStr } = formData;

  const formattedFormData = {
    ...formData,
    amount: Number(amountStr),
    date: new Date(dateStr)
  }

  const { amount, wallet: walletId, category: categoryId, date } = formattedFormData;

  const categoryDocRef = doc(db, `users/${userId}/categories/${categoryId}`);
  const walletDocRef = doc(db, `users/${userId}/wallets/${walletId}`);
  const transactionsCollectionRef = collection(db, `users/${userId}/wallets/${walletId}/transactions`);
  const transactionDocRef = doc(transactionsCollectionRef);

  try {
    await validateTransactionData({
      docRefs: { wallet: walletDocRef, category: categoryDocRef },
      data: formattedFormData
    });

    // const formattedDate = Timestamp.fromDate(new Date(date));

    const category = await getEntity(categoryDocRef, categoryId, "category");
    const wallet = await getEntity(walletDocRef, walletId, "wallet");

    await runTransaction(db, async (dbTransaction) => {
      const correctAmount = category.type === "expense" ? -amount : amount;
      await updateWalletBalance(dbTransaction, walletDocRef, correctAmount);

      addTransaction({
        dbTransaction,
        docRef: transactionDocRef,
        data: { amount, wallet, category, date }
      })
    })

    return createSuccessResponse({
      msg: "Transaction successful!",
      msgType: "success",
    })

  } catch (error) {
    console.error(error);

    if (error instanceof ValidationError) {
      return createErrorResponse(error.statusCode, error.message);
    }

    return createErrorResponse(500, "Couldn't complete your transaction. Please try again");
  }
}