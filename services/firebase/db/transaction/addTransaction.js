import { collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "services/firebase/firebase.config";
import { AppError } from "@/utils/errors";

export default function addTransaction(dbTransaction, userId, amount, wallet, category, date) {
  const transactionsCollectionRef = collection(db, `users/${userId}/wallets/${wallet.id}/transactions`);

  const newTransaction = {
    amount,
    category,
    wallet: {
      name: wallet.name,
      iconName: wallet.iconName
    },
    date,
    createdAt: serverTimestamp()
  }

  try {
    const transactionDocRef = doc(transactionsCollectionRef);
    dbTransaction.set(transactionDocRef, newTransaction);
  } catch (error) {
    throw new AppError(error.message, { cause: error });
  }
}