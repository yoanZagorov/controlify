import { getStoredData, storeRedirectData } from "@/utils/storage";
import { getAuthUserId } from "@/services/firebase/db/user";
import { createErrorResponse, createSuccessResponse } from "../responses";
import { getTransactions } from "@/services/firebase/db/transaction";
import { getWallets } from "@/services/firebase/db/wallet";
import { collection, getCountFromServer, orderBy, where } from "firebase/firestore";
import { getExpensesByWalletChartData } from "@/utils/wallet";
import { db } from "@/services/firebase/firebase.config";

export default async function walletsLoader({ request }) {
  const TARGET_NUM_TRANSACTIONS = 15;

  const userId = await getAuthUserId();

  if (!userId) {
    const redirectData = getStoredData("redirectData");
    console.log(redirectData);

    if (redirectData) {
      storeRedirectData(...redirectData);
    } else {
      const pathname = new URL(request.url).pathname;
      storeRedirectData("You must log in first", "alert", pathname);
    }

    return redirect("/login");
  }

  const period = "lastThirtyDays"; // To do: get this from the params

  const walletsCollectionRef = collection(db, `users/${userId}/wallets`);

  const walletsQuery = [
    where("deletedAt", "==", null),
    orderBy("isDefault", "desc"),
    orderBy("createdAt", "desc")
  ];

  try {
    const allWallets = await getWallets(walletsCollectionRef);
    const activeWallets = await getWallets(walletsCollectionRef, walletsQuery);


    // const totalTransactionsByWallet = await Promise.all(allActiveWallets.map(async (wallet) => {
    //   const transactionsCollectionRef = collection(db, `users/${userId}/wallets/${wallet.id}/transactions`);
    //   const countSnapshot = await getCountFromServer(transactionsCollectionRef);
    //   return { walletId: wallet.id, transactionsCount: countSnapshot.data().count };
    // }));

    // const totalTransactionCount = totalTransactionsByWallet.reduce((acc, wallet) => acc + wallet.transactionsCount, 0);

    // const walletsLimits = totalTransactionsByWallet.map(({ walletId, transactionsCount }) => ({
    //   walletId,
    //   limit: Math.floor((transactionsCount / totalTransactionCount) * TARGET_NUM_TRANSACTIONS) // Using a proportion for even distribution
    // }));

    const allTransactions = await getTransactions({ userId, wallets: allWallets }); // To do: limit the data and implement pagination
    allTransactions.sort((a, b) => b.date - a.date);

    const expensesByWalletChartData = await getExpensesByWalletChartData(userId, allWallets, period);

    const loaderData = { wallets: activeWallets, transactions: allTransactions, expensesByWalletChartData };

    return createSuccessResponse(loaderData);
  } catch (error) {
    console.error(error);

    return createErrorResponse(500, "Sorry, we couldn't load your wallets data. Please try again");
  }
}

