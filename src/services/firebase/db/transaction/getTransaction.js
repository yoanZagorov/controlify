import { AppError } from "@/utils/errors";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase/firebase.config";

export default async function getTransaction(userId, walletId, transactionId) {
  const transactionDocRef = doc(db, `users/${userId}/wallets/${walletId}/transactions/${transactionId}`);

  try {
    const docSnap = await getDoc(transactionDocRef);

    if (!docSnap.exists()) {
      throw new AppError(404, `A transaction with the id ${transactionId} doesn't seem to exist`);
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