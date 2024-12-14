import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

export default async function updateWallet(userId, walletId, walletData) {
  const walletDocRef = doc(db, `users/${userId}/wallets/${walletId}`);

  try {
    await updateDoc(walletDocRef, {
      ...walletData
    })
  } catch (error) {
    throw new Error("Unable to update wallet settings data!", { cause: error });
  }
}