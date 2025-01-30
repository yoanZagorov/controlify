import { AppError } from "@/utils/errors";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase/firebase.config";

export default async function checkWalletExistense(userId, walletId) {
  const walletRef = doc(db, `users/${userId}/wallets/${walletId}`);

  try {
    const walletDocSnap = await getDoc(walletRef);

    return walletDocSnap.exists();
  } catch (error) {
    throw new AppError("Error checking wallet existence", { cause: error }); // To do: Create a more user-friendly message and display it
  }
}