import { collection, doc } from "firebase/firestore";

import { db } from "@/services/firebase/firebase.config";
import { getAuthUserId } from "@/services/firebase/auth";

import { handleWalletUpdate, handleWalletDeletion } from "../utils/wallet";
import { handleTransactionDeletion, handleTransactionSubmission, handleTransactionUpdate } from "../utils/transaction";

export default async function walletAction({ request, params: { walletId } }) {
  const userId = await getAuthUserId();

  const formData = Object.fromEntries(await request.formData());
  const { intent } = formData;

  const walletDocRef = doc(db, `users/${userId}/wallets/${walletId}`);

  if (intent === "updateWallet") {
    return (await handleWalletUpdate(userId, walletId, formData));
  }

  if (intent === "deleteWallet") {
    const transactionsCollectionRef = collection(db, `users/${userId}/wallets/${walletId}/transactions`);
    return (await handleWalletDeletion(userId, walletId, walletDocRef, transactionsCollectionRef));
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