import { doc, updateDoc } from "firebase/firestore";
import { createErrorResponse, createSuccessResponse } from "../../responses";
import { ValidationError } from "@/utils/errors";
import { storeRedirectData } from "@/utils/storage";
import { redirect } from "react-router";
import { getEntities, getEntity } from "@/services/firebase/db/utils/entity";
import { db } from "@/services/firebase/firebase.config";
import { getTransactions } from "@/services/firebase/db/transaction";

export default async function handleWalletDeletion(userId, walletId, docRef, transactionsCollectionRef) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);


  try {
    // Updating the wallet field on each transaction before updating the wallet itself
    const wallet = await getEntity(docRef, walletId, "wallet");
    const transactions = await getTransactions({ userId, wallets: [wallet] });

    if (transactions.length) {
      const promises = transactions.map(transaction => {
        const transactionDocRef = doc(transactionsCollectionRef, transaction.id);

        return updateDoc(transactionDocRef, { "wallet.deletedAt": today });
      })

      await Promise.all(promises);
    }

    await updateDoc(docRef, { deletedAt: today });

    return createSuccessResponse({
      msg: "Successfully deleted wallet!",
      msgType: "success",
    })

    // Another variant
    // storeRedirectData("Successfully deleted wallet!", "success");
    // return redirect("/app/wallets");

  } catch (error) {
    console.error(error);

    if (error instanceof ValidationError) {
      return createErrorResponse(error.statusCode, error.message);
    }

    return createErrorResponse(500, error.message);
  }
}