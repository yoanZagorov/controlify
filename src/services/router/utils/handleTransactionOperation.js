import { getCategory } from "@/services/firebase/db/category";
import { addTransaction, getTransaction, getTransactions } from "@/services/firebase/db/transaction";
import { getWallet } from "@/services/firebase/db/wallet";
import updateWalletBalance from "@/services/firebase/db/wallet/updateWalletBalance";
import { validateTransactionData } from "@/utils/transaction";
import { runTransaction, Timestamp } from "firebase/firestore";
import { createErrorResponse, createSuccessResponse } from "../responses";
import { ValidationError } from "@/utils/errors";
import { db } from "@/services/firebase/firebase.config";
import editTransaction from "@/services/firebase/db/transaction/editTransaction";

export default async function handleTransactionOperation({ type, userId, formData }) {
  const isSubmission = type === "submission";
  const isUpdate = type === "update";

  const { amount: strAmount, wallet: walletId, category: categoryId, date } = formData;

  const { transaction: transactionId } = isUpdate ? formData : {};

  console.log(formData);

  const amount = Number(strAmount);

  try {
    await validateTransactionData(userId, amount, walletId, categoryId, date);

    const formattedDate = Timestamp.fromDate(new Date(date));

    const category = await getCategory(userId, categoryId);
    const wallet = await getWallet(userId, walletId);

    const oldTransactionData = isUpdate
      ? await getTransaction(userId, walletId, transactionId)
      : null;

    await runTransaction(db, async (dbTransaction) => {
      await updateWalletBalance(dbTransaction, userId, walletId, amount, category.type);
      isSubmission
        ? addTransaction({
          dbTransaction,
          ids: { user: userId, wallet: walletId },
          data: { amount, wallet, category, date: formattedDate }
        })
        : editTransaction({
          dbTransaction,
          ids: { user: userId, wallet: walletId, transaction: transactionId },
          oldData: oldTransactionData,
          newData: { amount, wallet, category, date: formattedDate }
        });
    })

    return createSuccessResponse({
      msg: isSubmission ? "Transaction successful!" : "Transaction updated successfully!",
      msgType: "success",
    })

  } catch (error) {
    console.error(error);

    if (error?.options?.cause) {
      console.error(error.options.cause);
    }

    if (error instanceof ValidationError) {
      return createErrorResponse(error.statusCode, error.message);
    }

    return createErrorResponse(500, `Couldn't ${isSubmission ? "complete" : "update"} your transaction. Please try again`);
  }
}