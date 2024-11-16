import { redirect } from "react-router-dom";

import { getAuthUserId, getUser, getCurrentBalance } from "services/firebase/db/user";
import { getWallets } from "services/firebase/db/wallet";
import { getCategories } from "services/firebase/db/category";
import { getTransactions } from "services/firebase/db/transaction";

import { createSuccessResponse, createErrorResponse } from "../responses";

import { getStoredData, storeRedirectData } from "@/utils/storage";
import { getRandomItem } from "@/utils/array";
import { quotes } from "@/pages/auth/data";
import { getBalanceChartData } from "@/utils/transaction";
import { orderBy, where } from "firebase/firestore";
import { AppError } from "@/utils/errors";
import { getTodayStartAndEnd } from "@/utils/date";

export default async function appLoader({ request }) {
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

  const { start, end } = getTodayStartAndEnd();
  const transactionsQuery = [
    where("createdAt", ">=", start),
    where("createdAt", "<=", end),
    orderBy("createdAt", "desc")
  ];

  try {
    const user = await getUser(userId);
    const wallets = await getWallets(userId, walletsQuery);
    const categories = await getCategories(userId);
    const balance = await getCurrentBalance("_", wallets);
    const todayTransactionsByWallet = await getTransactions(userId, wallets, transactionsQuery);
    const balanceChartData = await getBalanceChartData(userId);

    const storedRedirectData = getStoredData("redirectData");

    const loaderData = {
      userData: {
        user,
        wallets,
        categories,
        balance,
        todayTransactionsByWallet,
        balanceChartData
      },
      notificationData: {
        quote: getRandomItem(quotes),
        redirectData: storedRedirectData || {}
      }
    }

    return createSuccessResponse(loaderData);

  } catch (error) {
    // To do: create more specific error messages
    if (error instanceof AppError) {
      console.error(error.statusCode, error);
    } else {
      console.error(error);
    }

    // To do: create a Firebase Firestore errors map

    throw createErrorResponse(500, "Sorry, we couldn't load your profile data. Please try again");
  }
}