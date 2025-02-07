import { redirect } from "react-router";

import { PERIODS, ROUTES } from "@/constants";

import { checkUserAuthStatus, getAuthUserId } from "@/services/firebase/auth";

import { getActiveWallets, getWallets } from "@/services/firebase/db/wallet";
import { getTransactions } from "@/services/firebase/db/transaction";

import { createErrorResponse, createSuccessResponse } from "../responses";

import { getExpensesByWalletChartData } from "../utils/chartData";

import { getPeriodInfo } from "@/utils/date";

export default async function walletsLoader({ request }) {
  const userId = await getAuthUserId();
  if (!checkUserAuthStatus(userId, request.url)) {
    return redirect(ROUTES.LOGIN);
  }

  try {
    const allWallets = await getWallets(userId);
    const activeWallets = await getActiveWallets(userId);

    // To do (Non-MVP): limit the data and implement pagination
    const allTransactions = await getTransactions({ userId, providedWallets: allWallets, sortType: "newestFirst" });

    const periodInfo = getPeriodInfo(PERIODS.DEFAULT_PERIOD);
    const expensesByWalletChartData = await getExpensesByWalletChartData({ userId, periodInfo, providedData: { wallets: allWallets } });

    const loaderData = {
      wallets: activeWallets,
      transactions: allTransactions,
      expensesByWalletChartData
    };

    return createSuccessResponse(loaderData);
  } catch (error) {
    console.error(error);

    throw createErrorResponse("Sorry, we couldn't load your wallets data. Please try again and contact us at yoan.zagorov@gmail.com if the issue persists");
  }
}

