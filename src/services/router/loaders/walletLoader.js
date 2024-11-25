import { getWallet } from "@/services/firebase/db/wallet";
import { createErrorResponse, createSuccessResponse } from "../responses";
import { getAuthUserId, getBalance } from "@/services/firebase/db/user";
import { storeRedirectData } from "@/utils/storage";
import { redirect } from "react-router";
import { getBalanceChartData } from "@/utils/transaction";

import { where } from "firebase/firestore";
import { getTransactions } from "@/services/firebase/db/transaction";
import { getExpensesByCategoryChartData } from "@/utils/category";
import { getPeriodInfo } from "../utils";
import { getExpensesVsIncomeChartData } from "@/utils/wallet";

export default async function walletLoader({ params, request }) {
  const userId = await getAuthUserId();

  if (!userId) {
    const pathname = new URL(request.url).pathname;
    storeRedirectData("You must log in first", "alert", pathname);

    return redirect("/login");
  }

  const walletId = params.walletId;
  const period = "lastThirtyDays"; // To do: get this from the params

  const { start, end } = getPeriodInfo(period);

  const transactionsQuery = [
    where("date", ">=", start),
    where("date", "<=", end)
  ];

  try {
    const wallet = await getWallet(userId, walletId);

    const periodTransactions = await getTransactions({ userId, wallets: [wallet], query: transactionsQuery }); // use for both functions below

    const { openingBalance, balanceChartData } = await getBalanceChartData({ userId, wallets: [wallet], period, transactions: periodTransactions });

    const expensesByCategoryChartData = await getExpensesByCategoryChartData({ transactions: periodTransactions });
    const expensesVsIncomeChartData = await getExpensesVsIncomeChartData({ transactions: periodTransactions }); // To do 

    return createSuccessResponse({
      wallet,
      openingBalance,
      chartData: {
        balance: balanceChartData,
        expensesByCategory: expensesByCategoryChartData,
        expensesVsIncome: expensesVsIncomeChartData
      }
    });
  } catch (error) {
    console.error(error);

    return createErrorResponse(500, "Sorry, we couldn't load your wallet data. Please try again");
  }
}