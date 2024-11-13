import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "services/firebase/firebase.config";
import { getCategory } from "../category";
import { getWallet } from "../wallet";
import { AppError } from "@/utils/errors";

export default function addTransaction(dbTransaction, userId, amount, wallet, category, date) {
  const transactionsCollectionRef = collection(db, `users/${userId}/wallets/${wallet.id}/transactions`);

  const newTransaction = {
    amount,
    category,
    wallet,
    date,
    createdAt: new Date()
  }

  try {
    const transactionDocRef = doc(transactionsCollectionRef);
    dbTransaction.set(transactionDocRef, newTransaction);
  } catch (error) {
    throw new AppError(error.message, { cause: error });
  }
}