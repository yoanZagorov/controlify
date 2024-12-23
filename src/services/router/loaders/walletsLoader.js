import { storeRedirectData } from "@/utils/storage";
import { getAuthUserId } from "@/services/firebase/db/user";
import { createErrorResponse, createSuccessResponse } from "../responses";
import { getTransactions } from "@/services/firebase/db/transaction";
import { getWallets } from "@/services/firebase/db/wallet";
import { orderBy, where } from "firebase/firestore";
import { getExpensesByWalletChartData } from "@/utils/wallet";

export default async function walletsLoader() {
  const userId = await getAuthUserId();

  if (!userId) {
    const pathname = new URL(request.url).pathname;
    storeRedirectData("You must log in first", "alert", pathname);

    return redirect("/login");
  }

  const period = "lastThirtyDays"; // To do: get this from the params

  const walletsQuery = [
    where("deletedAt", "==", null),
    orderBy("isDefault", "desc"),
    orderBy("createdAt", "desc")
  ];

  try {
    const allWallets = await getWallets(userId, walletsQuery);

    const allTransactions = await getTransactions({ userId, wallets: allWallets }); // To do: limit the data and implement pagination
    allTransactions.sort((a, b) => b.date - a.date);

    const expensesByWalletChartData = await getExpensesByWalletChartData(userId, allWallets, period);

    const loaderData = { wallets: allWallets, transactions: allTransactions, expensesByWalletChartData };

    return createSuccessResponse(loaderData);
  } catch (error) {
    console.error(error);

    return createErrorResponse(500, "Sorry, we couldn't load your wallets data. Please try again");
  }
}

