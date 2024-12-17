import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

export default function updateWallet(transaction, userId, walletId, walletData) {
  const walletDocRef = doc(db, `users/${userId}/wallets/${walletId}`);

  transaction.update(walletDocRef, {
    ...walletData
  })
}