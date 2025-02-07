import { redirect } from "react-router";

import { PERIODS, ROUTES } from "@/constants";

import { checkUserAuthStatus, getAuthUserId } from "@/services/firebase/auth";

import { getPeriodTransactionsByWallet, getTransactions } from "@/services/firebase/db/transaction";
import { getWallet } from "@/services/firebase/db/wallet";

import { createErrorResponse, createSuccessResponse } from "../responses";

import { getCashFlowByCategoryChartData, getExpensesVsIncomeChartData, getWalletBalanceChartData } from "../utils/chartData";

import { getPeriodInfo } from "@/utils/date";

export default async function walletLoader({ params, request }) {
  const userId = await getAuthUserId();
  if (!checkUserAuthStatus(userId, request.url)) {
    return redirect(ROUTES.LOGIN);
  }

  try {
    const walletId = params.walletId;
    const wallet = await getWallet(userId, walletId);

    const allWalletTransactions = await getTransactions({ userId, providedWallets: [wallet], sortType: "newestFirst" });

    // Used for multiple functions below
    const periodInfo = getPeriodInfo(PERIODS.DEFAULT_PERIOD);
    const periodTransactionsByWallet = await getPeriodTransactionsByWallet({ userId, providedWallets: [wallet], periodInfo }); // used for both functions below
    const periodTransactions = periodTransactionsByWallet.flatMap(wallet => wallet.transactions);

    const { openingBalance, balanceOverTimeChartData } = await getWalletBalanceChartData({ userId, wallet, periodInfo, periodTransactions });
    const expensesByCategoryChartData = await getCashFlowByCategoryChartData({ type: "expense", userId, providedData: { periodTransactionsByWallet } });
    const expensesVsIncomeChartData = await getExpensesVsIncomeChartData({ providedPeriodTransactions: periodTransactions });

    return createSuccessResponse({
      wallet,
      transactions: allWalletTransactions,
      openingBalance,
      chartData: {
        balance: balanceOverTimeChartData,
        expensesByCategory: expensesByCategoryChartData,
        expensesVsIncome: expensesVsIncomeChartData
      }
    });
  } catch (error) {
    console.error(error);

    throw createErrorResponse("Sorry, we couldn't load your wallet data. Please try again and contact us at yoan.zagorov@gmail.com if the issue persists");
  }
}