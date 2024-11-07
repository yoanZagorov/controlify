import { addDoc, collection } from "firebase/firestore";
import { db } from "services/firebase/firebase.config";
import { getCategory } from "../category";
import { getWallet } from "../wallet";
import { AppError } from "@/utils/errors";

export default async function addTransaction(userId, amount, walletId, categoryId, date) {
  const transactionsCollectionRef = collection(db, `users/${userId}/wallets/${walletId}/transactions`);

  const category = await getCategory(userId, categoryId);
  const wallet = await getWallet(userId, walletId);

  try {
    await addDoc(transactionsCollectionRef, {
      amount,
      category,
      wallet,
      date,
      createdAt: new Date()
    })
  } catch (error) {
    throw new AppError(error.message, { cause: error });
  }
}