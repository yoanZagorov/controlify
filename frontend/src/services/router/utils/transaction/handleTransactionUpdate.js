import { addTransaction, editTransaction } from "@/services/firebase/db/transaction";
import { updateWalletBalance } from "@/services/firebase/db/wallet";
import { validateTransactionData } from "@/utils/transaction";
import { collection, doc, runTransaction, Timestamp } from "firebase/firestore";
import { createErrorResponse, createSuccessResponse } from "../../responses";
import { ValidationError } from "@/utils/errors";
import { db } from "@/services/firebase/firebase.config";
import { getEntity } from "@/services/firebase/db/utils/entity";
import getDataToChange from "../getDataToChange";

export default async function handleTransactionUpdate(userId, formData) {
  const { amount: amountStr, date: dateStr } = formData;

  const formattedFormData = {
    ...formData,
    amount: Number(amountStr),
    date: new Date(dateStr)
  }

  const { amount, wallet: walletId, category: categoryId, date, transactionId } = formattedFormData;

  const categoryDocRef = doc(db, `users/${userId}/categories/${categoryId}`);
  const walletDocRef = doc(db, `users/${userId}/wallets/${walletId}`);
  const transactionDocRef = doc(db, `users/${userId}/wallets/${walletId}/transactions/${transactionId}`);

  try {
    await validateTransactionData({
      docRefs: { wallet: walletDocRef, category: categoryDocRef, transaction: transactionDocRef },
      data: formattedFormData
    });

    // const formattedDate = Timestamp.fromDate(date);

    const oldTransactionData = await getEntity(transactionDocRef, transactionId, "transaction");

    const hasDataChanged = {
      amount: oldTransactionData.amount !== amount,
      wallet: false, // The wallet should never change
      category: oldTransactionData.category.id !== categoryId,
      date: oldTransactionData.date.toDate() !== date
    }

    const dataToChange = getDataToChange(hasDataChanged, formattedFormData);

    const { type: categoryType } = (await getEntity(categoryDocRef, categoryId, "category"));

    await runTransaction(db, async (dbTransaction) => {
      if (hasDataChanged.amount) {
        const amountDifference = categoryType === "expense"
          ? oldTransactionData.amount - amount
          : amount - oldTransactionData.amount;

        await updateWalletBalance(dbTransaction, walletDocRef, amountDifference);
      }

      await editTransaction({
        dbTransaction,
        docRefs: {
          category: categoryDocRef,
          wallet: walletDocRef,
          transaction: transactionDocRef
        },
        ids: {
          category: categoryId,
          wallet: walletId
        },
        data: dataToChange
      });
    })

    return createSuccessResponse({
      msg: "Transaction updated successfully!",
      msgType: "success",
    })

  } catch (error) {
    console.error(error);

    if (error instanceof ValidationError) {
      return createErrorResponse(error.statusCode, error.message);
    }

    return createErrorResponse("Couldn't update your transaction. Please try again");
  }
}