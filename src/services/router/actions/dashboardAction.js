import { getAuthUserId } from "@/services/firebase/db/user";
import { formatTransactionData, validateTransactionData } from "@/utils/transaction";
import { addTransaction } from "@/services/firebase/db/transaction";
import { createErrorResponse, createSuccessResponse } from "../responses";
import { ValidationError } from "@/utils/errors";
import { getCategory } from "@/services/firebase/db/category";
import { getWallet } from "@/services/firebase/db/wallet";
import updateWalletBalance from "@/services/firebase/db/wallet/updateWalletBalance";
import { runTransaction, Timestamp } from "firebase/firestore";
import { db } from "@/services/firebase/firebase.config";

export default async function dashboardAction({ request }) {
  const userId = await getAuthUserId();

  const formData = Object.fromEntries(await request.formData());
  const { intent, amount: strAmount, wallet: walletId, category: categoryId, date } = formData;

  const amount = Number(strAmount);

  if (intent === "add-transaction") {
    try {
      // throw new Error("Kaboom");
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
}