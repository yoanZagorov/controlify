import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "services/firebase/firebase.config";

import { getTodayStartAndEnd } from "@/utils/date";
import { AppError } from "@/utils/errors";

export default async function getUserTodayTransactions(userId, wallets) {
  const { start, end } = getTodayStartAndEnd();

  const promises = wallets.map(async (wallet) => {
    const transactionsRef = collection(db, `users/${userId}/wallets/${wallet.id}/transactions`);

    const q = query(transactionsRef,
      where("createdAt", ">=", start),
      where("createdAt", "<=", end)
    );

    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return {
          walletId: wallet.id,
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
        walletId: wallet.id,
        transactions
      }
    } catch (error) {
      throw new AppError("Error fetching transactions", { cause: error });
    }
  })

  try {
    const allTransactions = await Promise.all(promises);

    return allTransactions;
  } catch (error) {
    throw new AppError("Error fetching transactions", { cause: error });
  }
}