import { AppError } from "@/utils/errors";
import { doc, getDoc } from "firebase/firestore";
import { db } from "services/firebase/firebase.config";

export default async function getWallet(userId, walletId) {
  const walletDocRef = doc(db, `users/${userId}/wallets/${walletId}`);

  try {
    const docSnap = await getDoc(walletDocRef);

    if (!docSnap.exists()) {
      throw new AppError(404, `A wallet with the id ${walletId} doesn't seem to exist`);
    }

    return ({
      ...docSnap.data(),
      id: docSnap.id
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message, { cause: error })
    } else {
      throw new Error(error.message, { cause: error });
    }
  }
}