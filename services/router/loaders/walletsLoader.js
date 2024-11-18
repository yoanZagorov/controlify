import { storeRedirectData } from "@/utils/storage";
import { getAuthUserId } from "services/firebase/db/user";
import { createErrorResponse, createSuccessResponse } from "../responses";
import { getTransactions } from "services/firebase/db/transaction";
import { getWallets } from "services/firebase/db/wallet";
import { orderBy, where } from "firebase/firestore";

export default async function walletsLoader() {
  const userId = await getAuthUserId();

  if (!userId) {
    const pathname = new URL(request.url).pathname;
    storeRedirectData("You must log in first", "alert", pathname);

    return redirect("/login");
  }

  const walletsQuery = [
    where("deletedAt", "==", null),
    orderBy("isDefault", "desc"),
    orderBy("createdAt", "desc")
  ];

  try {
    const allWallets = await getWallets(userId, walletsQuery);
    const allTransactions = await getTransactions(userId, allWallets); // To do: limit the data and implement pagination
    // const expensesByWalletChartData = await getExpensesByWalletChartData

    const loaderData = { wallets: allWallets, transactions: allTransactions };

    return createSuccessResponse(loaderData);
  } catch (error) {
    console.error(error);

    return createErrorResponse(500, "Sorry, we couldn't load your wallets data. Please try again");
  }
}

