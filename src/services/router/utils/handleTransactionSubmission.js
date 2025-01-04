import { getCategory } from "@/services/firebase/db/category";
import { addTransaction } from "@/services/firebase/db/transaction";
import { getWallet } from "@/services/firebase/db/wallet";
import updateWalletBalance from "@/services/firebase/db/wallet/updateWalletBalance";
import { validateTransactionData } from "@/utils/transaction";
import { runTransaction, Timestamp } from "firebase/firestore";
import { createErrorResponse, createSuccessResponse } from "../responses";
import { ValidationError } from "@/utils/errors";
import { db } from "@/services/firebase/firebase.config";

export default async function handleTransactionSubmission({ userId, formData }) {
  const { amount: strAmount, wallet: walletId, category: categoryId, date } = formData;

  const amount = Number(strAmount);

  try {
    await validateTransactionData(userId, amount, walletId, categoryId, date);

    const formattedDate = Timestamp.fromDate(new Date(date));

    const category = await getCategory(userId, categoryId);
    const wallet = await getWallet(userId, walletId);

    await runTransaction(db, async (dbTransaction) => {
      await updateWalletBalance(dbTransaction, userId, walletId, amount, category.type);
      addTransaction(dbTransaction, userId, amount, wallet, category, formattedDate);
    })

    return createSuccessResponse({
      msg: "Transaction successful!",
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

    return createErrorResponse(500, "Couldn't complete your transaction. Please try again");
  }
}