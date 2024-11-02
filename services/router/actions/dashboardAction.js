import { getAuthUserId } from "@/utils/auth";
import { formatTransactionData, verifyTransactionData } from "@/utils/transaction";
import { addTransaction } from "services/firebase/db/transaction";

export default async function dashboardAction({ request }) {
  try {
    const authUserId = await getAuthUserId();

    const formData = await request.formData();

    const amount = formData.get("amount");
    const walletId = formData.get("wallet");
    const categoryId = formData.get("category");
    const date = formData.get("date");

    await verifyTransactionData(authUserId, amount, walletId, categoryId, date);

    const { formattedAmount, formattedDate } = formatTransactionData(amount, date);

    await addTransaction(authUserId, formattedAmount, walletId, categoryId, formattedDate);

    console.log("Successfully added the transaction!");
    return {
      success: true,
      msg: "Transaction successful",
      resetKey: Date.now().toString()
    };
  } catch (error) {
    console.error(error);
    return { errorMsg: error.message };
  }
}