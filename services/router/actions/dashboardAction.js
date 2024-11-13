import { getAuthUserId } from "services/firebase/db/user";
import { formatTransactionData, validateTransactionData } from "@/utils/transaction";
import { addTransaction } from "services/firebase/db/transaction";
import { createErrorResponse, createSuccessResponse } from "../responses";
import { json } from "react-router-dom";
import { ValidationError } from "@/utils/errors";

export default async function dashboardAction({ request }) {
  const userId = await getAuthUserId();

  const formData = Object.fromEntries(await request.formData());
  const { intent, amount, wallet: walletId, category: categoryId, date } = formData;

  if (intent === "add-transaction") {
    try {
      // throw new Error("Kaboom");
      await validateTransactionData(userId, amount, walletId, categoryId, date);

      const { formattedAmount, formattedDate } = formatTransactionData(amount, date);

      await addTransaction(userId, formattedAmount, walletId, categoryId, formattedDate);

      // To do: update the Wallet with the new balance 
      // const msg = "Transaction successful!";
      // console.log(msg);
      // return json({ message: msg });

      return createSuccessResponse({
        msg: "Transaction successful!",
        msgType: "success",
        // success: true,
        resetKey: Date.now()
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