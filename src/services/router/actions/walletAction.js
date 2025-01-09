import { doc } from "firebase/firestore";

import { db } from "@/services/firebase/firebase.config";
import { getAuthUserId } from "@/services/firebase/db/user";

import { handleWalletUpdate, handleWalletDeletion } from "../utils/wallet";
import { handleTransactionDeletion, handleTransactionSubmission, handleTransactionUpdate } from "../utils/transaction";

export default async function walletAction({ request, params }) {
  const userId = await getAuthUserId();
  const walletId = params.walletId;

  const formData = Object.fromEntries(await request.formData());

  const { intent } = formData;

  const walletDocRef = doc(db, `users/${userId}/wallets/${walletId}`);

  if (intent === "updateWallet") {
    return (await handleWalletUpdate(userId, walletDocRef, formData));
  }

  if (intent === "deleteWallet") {
    // return console.log("deleting wallet...");
    return (await handleWalletDeletion(walletDocRef));
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