import { doc, getDoc } from "firebase/firestore";
import { db } from "services/firebase/firebase.config";

export default async function checkWalletExistense(userId, walletId) {
  const walletRef = doc(db, `users/${userId}/wallets/${walletId}`);

  try {
    const walletDoc = await getDoc(walletRef);

    return walletDoc.exists();
  } catch (error) {
    console.error(error);
    throw new Error("Error checking wallet existence");
  }
}