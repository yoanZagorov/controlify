import { getAuthUserId } from "@/services/firebase/db/user";

import { handleTransactionDeletion, handleTransactionSubmission, handleTransactionUpdate } from "../utils/transaction";
import { handleWalletSubmission } from "../utils/wallet";

export default async function walletsAction({ request }) {
  const userId = await getAuthUserId();

  const formData = Object.fromEntries(await request.formData());
  const { intent } = formData;

  if (intent === "addWallet") {
    return (await handleWalletSubmission(userId, formData));
  }

  if (intent === "addTransaction") {
    return (await handleTransactionSubmission(userId, formData));
  }

  if (intent === "updateTransaction") {
    return (await handleTransactionUpdate(userId, formData));
  }

  if (intent === "deleteTransaction") {
    return (await handleTransactionDeletion(userId, formData));
  }
}