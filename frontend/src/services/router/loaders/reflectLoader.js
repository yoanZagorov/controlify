import { redirect } from "react-router";
import { where } from "firebase/firestore";

import { PERIODS, ROUTES } from "@/constants";

import { checkUserAuthStatus, getAuthUserId } from "@/services/firebase/auth";
import { getBaseCurrency } from "@/services/firebase/db/currency";
import { getWallets } from "@/services/firebase/db/wallet";
import { getUser } from "@/services/firebase/db/user";
import { getPeriodTransactions } from "@/services/firebase/db/transaction";

import { createErrorResponse, createSuccessResponse } from "../responses";

import { getUserFinancialScore } from "../utils/user";
import { getBalance, getBalanceOverTimeLineChartData, getCashFlowByEntityPieChartData, getCashFlowOverTimeWaterfallChartData } from "../utils/charts";
import { convertTransactionsToPreferredCurrency } from "../utils/currency";

import { getPeriodInfo } from "@/utils/date";

export default async function reflectLoader({ request }) {
  const userId = await getAuthUserId();
  if (!checkUserAuthStatus(userId, request.url)) {
    return redirect(ROUTES.LOGIN);
  }

  try {
    // Get shared calculation data
    const baseCurrency = await getBaseCurrency();
    const periodInfo = getPeriodInfo(PERIODS.DEFAULT_PERIOD);
    const allWallets = await getWallets(userId);
    const periodTransactions = await getPeriodTransactions({ userId, providedWallets: allWallets, periodInfo });

    // Convert all transactions amounts to preferred currency here since they're the same and used in multiple functions (see the docs for more details)
    const { currency: userCurrency } = (await getUser(userId));
    await convertTransactionsToPreferredCurrency(periodTransactions, userCurrency, baseCurrency);

    // Get the data
    const financialScore = await getUserFinancialScore(periodTransactions);

    // Calculate balance before start of period
    const openingBalanceTransactionsQuery = [where("date", "<", periodInfo.start)];
    const openingBalance = await getBalance({ userId, wallets: allWallets, query: openingBalanceTransactionsQuery, preferredCurrency: userCurrency, providedBaseCurrency: baseCurrency });

    // Get the data for the charts
    const balanceOverTimeLineChartData = await getBalanceOverTimeLineChartData({ openingBalance, periodTransactions, periodInfo, trackBalanceChange: true });
    const expensesByCategoryPieChartData = await getCashFlowByEntityPieChartData("category", "expense", periodTransactions);
    const incomeByCategoryPieChartData = await getCashFlowByEntityPieChartData("category", "income", periodTransactions);
    const cashFlowOverTimeWaterfallChartData = await getCashFlowOverTimeWaterfallChartData(periodTransactions, periodInfo);

    const loaderData = {
      financialScore,
      chartData: {
        balanceOverTime: balanceOverTimeLineChartData,
        expensesByCategory: expensesByCategoryPieChartData,
        incomeByCategory: incomeByCategoryPieChartData,
        cashFlowOverTime: cashFlowOverTimeWaterfallChartData
      }
    }

    return createSuccessResponse(loaderData);
  } catch (error) {
    console.error(error);

    throw createErrorResponse("Sorry, we couldn't load your stats. Please try again and contact us at yoan.zagorov@gmail.com if the issue persists");
  }
}