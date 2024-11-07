import { AppError } from "@/utils/errors";
import { doc, getDoc } from "firebase/firestore";
import { db } from "services/firebase/firebase.config";

export default async function getWallet(userId, walletId) {
  const walletDocRef = doc(db, `users/${userId}/wallets/${walletId}`);

  try {
    const docSnap = await getDoc(walletDocRef);

    if (!docSnap.exists()) {
      throw new AppError(`A wallet with the id ${walletId} doesn't seem to exist`);
    }

    return ({
      ...docSnap.data(),
      id: docSnap.id
    });
  } catch (error) {
    throw new AppError(error.message, { cause: error })
  }
}