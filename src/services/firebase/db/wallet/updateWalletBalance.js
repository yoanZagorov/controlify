import { AppError } from "@/utils/errors";
import { performDecimalCalculation } from "@/utils/number";
import { doc } from "firebase/firestore";
import { db } from "@/services/firebase/firebase.config";

export default async function updateWalletBalance(dbTransaction, userId, walletId, amount, categoryType) {
  const walletDocRef = doc(db, `users/${userId}/wallets/${walletId}`);

  const correctAmount = categoryType === "expense" ? -amount : amount;

  try {
    const walletDoc = await dbTransaction.get(walletDocRef);

    const newBalance = performDecimalCalculation(walletDoc.data().balance, correctAmount, "+");

    dbTransaction.update(walletDocRef, { balance: newBalance });
  } catch (error) {
    console.error(error);
    throw new AppError(error.message, { cause: error });
  }
}