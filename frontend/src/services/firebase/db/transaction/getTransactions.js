import { collection, getDocs, query as firebaseQuery } from "firebase/firestore";
import { db } from "@/services/firebase/firebase.config";

export default async function getTransactions({ userId, wallets, query = [], dataFormat = "flat" }) {
  const promises = wallets.map(async (wallet, index) => {
    const transactionsCollectionRef = collection(db, `users/${userId}/wallets/${wallet.id}/transactions`);

    const transactionsQuery = firebaseQuery(transactionsCollectionRef, ...query);

    try {
      const querySnapshot = await getDocs(transactionsQuery);

      if (querySnapshot.empty) {
        return {
          ...wallet,
          transactions: []
        };
      }

      const transactions = querySnapshot.docs.map(doc => {
        return ({
          ...doc.data(),
          date: doc.data().date.toDate(), // Using toDate() to make it easier to convert the data to an actual JS Date obj on the client.
          createdAt: doc.data().createdAt.toDate(),
          id: doc.id
        })
      });

      return {
        ...wallet,
        transactions
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching transactions. Please try again.", { cause: error });
    }
  })

  try {
    const allTransactionsByWallet = await Promise.all(promises);

    if (dataFormat === "flat") {
      return allTransactionsByWallet.flatMap(wallet => wallet.transactions);
    } else {
      return allTransactionsByWallet;
    }
  } catch (error) {
    throw new Error(error.message, { cause: error });
  }
}