import { arrayRemove, collection, doc, where, writeBatch } from "firebase/firestore";
import { createErrorResponse, createSuccessResponse } from "../../responses";
import { getEntities } from "@/services/firebase/db/utils/entity";
import { getTransactions } from "@/services/firebase/db/transaction";
import { db } from "@/services/firebase/firebase.config";

export default async function handleCategoryDeletion(userId, formData) {
  const { id } = formData;

  try {
    const batch = writeBatch(db);

    const walletsCollectionRef = collection(db, `users/${userId}/wallets`);
    const walletsQuery = [
      where("deletedAt", "==", null)
    ]
    const activeWallets = await getEntities(walletsCollectionRef, "wallets", walletsQuery);
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
    onsole.error(error);

    return createErrorResponse(500, "Couldn't delete the category. Please try again.");
  }
}