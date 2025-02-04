import { redirect } from "react-router";

import { DEFAULT_PERIOD, ROUTES } from "@/constants";

import { checkUserAuthStatus, getAuthUserId } from "@/services/firebase/auth";
import { getBaseCurrency } from "@/services/firebase/db/currency";

import { createSuccessResponse, createErrorResponse } from "../responses";

import { getCurrentUserBalance } from "../utils/user";
import { getUserBalanceChartData } from "../utils/chartData";
import { getUser } from "@/services/firebase/db/user";
import { getActiveWallets, getWallets } from "@/services/firebase/db/wallet";
import { getCategories } from "@/services/firebase/db/category";
import { getTodayTransactions } from "@/services/firebase/db/transaction";
import { getRandomQuote } from "@/services/firebase/db/quote";
import { getStoredRedirectData } from "@/utils/localStorage";

export default async function appLoader({ request }) {
  const userId = await getAuthUserId();
  if (!checkUserAuthStatus(userId, request.url)) {
    return redirect(ROUTES.LOGIN);
  }

  try {
    // Fetching these here, since using for more than one function below
    const baseCurrency = await getBaseCurrency();
    const allWallets = await getWallets(userId);

    const user = await getUser(userId);
    const categories = await getCategories(userId);
    const activeWallets = await getActiveWallets(userId);
    const todayTransactions = await getTodayTransactions(userId, allWallets);

    const balance = await getCurrentUserBalance({
      userId,
      providedData: {
        activeWallets,
        baseCurrency,
        userCurrency: user.currency
      }
    });

    const balanceChartData = await getUserBalanceChartData({
      userId,
      period: DEFAULT_PERIOD,
      providedData: {
        allWallets,
        baseCurrency,
        userCurrency: user.currency
      }
    });

    const randomQuote = await getRandomQuote();
    const storedRedirectData = getStoredRedirectData();

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
        quote: randomQuote,
        redirectData: storedRedirectData || {}
      }
    }

    return createSuccessResponse(loaderData);

  } catch (error) {
    console.error(error);

    throw createErrorResponse("Sorry, we couldn't load your profile data. Please try again.");
  }
}