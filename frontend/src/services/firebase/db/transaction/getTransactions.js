import { collection, getDocs, query as firebaseQuery } from "firebase/firestore";
import { db } from "@/services/firebase/firebase.config";
import { getWallets } from "../../../router/utils/wallet";

export default async function getTransactions({ userId, prefetchedWallets = [], query = [], dataFormat = "flat" }) {
  let wallets = prefetchedWallets;
  if (!wallets) {
    wallets = await getWallets(userId);
  }

  const promises = wallets.map(async (wallet) => {
    const transactionsCollectionRef = collection(db, `users/${userId}/wallets/${wallet.id}/transactions`);
    const transactionsQuery = firebaseQuery(transactionsCollectionRef, ...query);
    const querySnapshot = await getDocs(transactionsQuery);

    if (querySnapshot.empty) {
      return {
        ...wallet,
        transactions: []
      };
    }

    // Using toDate() to make it easier to convert the data to an actual JS Date obj on the client
    const transactions = querySnapshot.docs.map(doc => {
      return ({
        ...doc.data(),
        date: doc.data().date.toDate(),
        createdAt: doc.data().createdAt.toDate(),
        id: doc.id
      })
    });

    return {
      ...wallet,
      transactions
    };
  })

  try {
    const transactionsByWallet = await Promise.all(promises);

    if (dataFormat === "flat") {
      return transactionsByWallet.flatMap(wallet => wallet.transactions);
    } else {
      return transactionsByWallet;
    }
  } catch (error) {
    throw new Error("Error fetching transactions", { cause: error });
  }
}