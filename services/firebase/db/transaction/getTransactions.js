import { AppError } from "@/utils/errors";
import { collection, getDocs, query as firebaseQuery } from "firebase/firestore";
import { db } from "services/firebase/firebase.config";

export default async function getTransactions(userId, wallets, query = []) {
  const promises = wallets.map(async (wallet) => {
    const transactionsRef = collection(db, `users/${userId}/wallets/${wallet.id}/transactions`);

    const q = firebaseQuery(transactionsRef, ...query);

    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return {
          ...wallet,
          transactions: []
        }
      }

      const transactions = querySnapshot.docs.map(doc => {
        return ({
          ...doc.data(),
          id: doc.id
        })
      });

      return {
        ...wallet,
        transactions
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching transactions", { cause: error });
    }
  })

  try {
    const allTransactions = await Promise.all(promises);

    return allTransactions;
  } catch (error) {
    throw new Error(error.message, { cause: error });
  }
}