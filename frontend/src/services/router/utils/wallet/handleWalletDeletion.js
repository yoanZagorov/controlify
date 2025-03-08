import { doc, writeBatch } from "firebase/firestore";

import { createSuccessResponse } from "../../responses";

import { getEntity } from "@/services/firebase/db/utils/entity";
import { db } from "@/services/firebase/firebase.config";
import { getTransactions } from "@/services/firebase/db/transaction";

import { isArrayTruthy } from "@/utils/array";

import handleActionError from "../handleActionError";

export default async function handleWalletDeletion(userId, walletId) {
  const today = new Date();
  const walletDocRef = doc(db, `users/${userId}/wallets/${walletId}`);

  try {
    const batch = writeBatch(db);

    // Updating the wallet field on each transaction before updating the wallet itself
    const wallet = await getEntity(walletDocRef, walletId, "wallet");
    const transactions = await getTransactions({ userId, providedWallets: [wallet] });
    if (isArrayTruthy(transactions)) {
      transactions.forEach(transaction => {
        const transactionDocRef = doc(db, `users/${userId}/wallets/${walletId}/transactions/${transaction.id}`);
        batch.update(transactionDocRef, { "wallet.deletedAt": today });
      })
    }

    // Soft deleting the wallet doc
    batch.update(walletDocRef, { deletedAt: today });

    await batch.commit();

    return createSuccessResponse({
      msg: "Successfully deleted your wallet!",
      msgType: "success",
    })

  } catch (error) {
    return handleActionError(error, "Couldn't delete your wallet. Please try again");
  }
}