import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase.config";

export default async function addTransaction(userId, walletId, payload) {
  try {
    const transactionsCollectionRef = collection(db, `users/${userId}/wallets/${walletId}/transactions`);
    await addDoc(transactionsCollectionRef, {
      ...payload,
      createdAt: serverTimestamp()
    })
  } catch (error) {
    throw new Error("Error fetching transaction", { cause: error });
  }

}