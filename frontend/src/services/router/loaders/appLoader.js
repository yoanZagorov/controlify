import { redirect } from "react-router";
import { collection, orderBy, where } from "firebase/firestore";

import { getAuthUserId, getUser, getCurrentBalance } from "@/services/firebase/db/user";
import { getWallets } from "@/services/firebase/db/wallet";
import { getCategories } from "@/services/firebase/db/category";
import { getTransactions } from "@/services/firebase/db/transaction";

import { createSuccessResponse, createErrorResponse } from "../responses";

import { getStoredData, storeRedirectData } from "@/utils/storage";
import { getRandomItem } from "@/utils/array";
import { getBalanceChartData } from "@/utils/transaction";
import { AppError } from "@/utils/errors";
import { getTodayStartAndEnd } from "@/utils/date";
import { quotes } from "../utils";
import { db } from "@/services/firebase/firebase.config";
import { checkAuthEmailVerification } from "@/utils/auth";

export default async function appLoader({ request }) {
  const userId = await getAuthUserId();

  if (!userId) {
    const redirectData = getStoredData("redirectData");

    if (redirectData) {
      const { msg, msgType, originalPath } = redirectData;
      storeRedirectData(msg, msgType, originalPath);
    } else {
      const pathname = new URL(request.url).pathname;
      storeRedirectData("You must log in first", "alert", pathname);
    }

    return redirect("/login");
  }

  await checkAuthEmailVerification(userId);

  const walletsCollectionRef = collection(db, `users/${userId}/wallets`);

  const walletsQuery = [
    where("deletedAt", "==", null),
    orderBy("isDefault", "desc"),
    orderBy("createdAt", "desc")
  ];

  const { start, end } = getTodayStartAndEnd();
  const transactionsQuery = [
    where("date", ">=", start),
    where("date", "<=", end),
  ];

  try {
    const user = await getUser(userId);

    if (user.profilePic) {
      const transformations = "c_crop,g_face,h_1200,w_1200/c_scale,w_128/q_auto:best,f_auto";

      user.profilePic.url = user.profilePic.url.replace("/upload/", `/upload/${transformations}/`);
    }

    const activeWallets = await getWallets(walletsCollectionRef, walletsQuery);
    const allWallets = await getWallets(walletsCollectionRef);

    const categories = await getCategories(userId);

    const balance = await getCurrentBalance({ wallets: activeWallets, userCurrency: user.currency });

    const todayTransactions = await getTransactions({ userId, wallets: allWallets, query: transactionsQuery });
    todayTransactions.sort((a, b) => b.date - a.date);

    const { balanceChartData } = await getBalanceChartData({ userId, period: "lastThirtyDays", userCurrency: user.currency });
    console.log(balanceChartData);
    const storedRedirectData = getStoredData("redirectData");

    const loaderData = {
      userData: {
        ...user,
        wallets: activeWallets,
        categories,
        balance,
        todayTransactions,
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