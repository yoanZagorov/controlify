import { arrayRemove, collection, doc, where, writeBatch } from "firebase/firestore";
import { createErrorResponse, createSuccessResponse } from "../../responses";
import { getEntities } from "@/services/firebase/db/utils/entity";
import { getTransactions } from "@/services/firebase/db/transaction";
import { db } from "@/services/firebase/firebase.config";
import { getActiveWallets } from "@/services/firebase/db/wallet";

export default async function handleCategoryDeletion(userId, formData) {
  const { id } = formData;

  try {
    const batch = writeBatch(db);

    const activeWallets = await getActiveWallets(userId);
    activeWallets.forEach(wallet => {
      const walletDocRef = doc(db, `users/${userId}/wallets/${wallet.id}`);

      batch.update(walletDocRef, {
        categories: arrayRemove(id)
      })
    })

    const categoryDocRef = doc(db, `users/${userId}/categories/${id}`);
    batch.delete(categoryDocRef);

    await batch.commit();

    return createSuccessResponse({
      msg: `Successfully deleted the category!`,
      msgType: "success",
    })
  } catch (error) {
    console.error(error);

    return createErrorResponse("Couldn't delete the category. Please try again.");
  }
}