import { getLastThirthyDaysStartandEnd } from "@/utils/date";
import { collection, doc, getDocs, query } from "firebase/firestore";
import { db } from "services/firebase/firebase.config";
import { AppError } from "@/utils/errors";

export default async function getLastThirtyDaysTransactions(userId, wallets) {
  const { start, end } = getLastThirthyDaysStartandEnd();

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