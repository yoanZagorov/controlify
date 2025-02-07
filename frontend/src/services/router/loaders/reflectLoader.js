import { redirect } from "react-router";

import { PERIODS, ROUTES } from "@/constants";

import { checkUserAuthStatus, getAuthUserId } from "@/services/firebase/auth";
import { getWallets } from "@/services/firebase/db/wallet";
import { getBaseCurrency } from "@/services/firebase/db/currency";
import { getUser } from "@/services/firebase/db/user";
import { getPeriodTransactionsByWallet } from "@/services/firebase/db/transaction";

import { createErrorResponse, createSuccessResponse } from "../responses";

import { getUserFinancialScore } from "../utils/user";
import { getCashFlowByCategoryChartData, getCashFlowChartData, getUserBalanceChartData } from "../utils/chartData";
import { getNonBaseCurrenciesRates } from "../utils/currency";

import { getPeriodInfo } from "@/utils/date";

export default async function reflectLoader({ request }) {
  const userId = await getAuthUserId();
  if (!checkUserAuthStatus(userId, request.url)) {
    return redirect(ROUTES.LOGIN);
  }

  try {
    // Fetching here since using for more than one function below
    const allWallets = await getWallets(userId);
    const { currency: userCurrency } = (await getUser(userId));
    const baseCurrency = await getBaseCurrency();
    const periodInfo = getPeriodInfo(PERIODS.DEFAULT_PERIOD);
    const periodTransactionsByWallet = await getPeriodTransactionsByWallet({ userId, providedWallets: allWallets, periodInfo });
    const nonBaseCurrenciesRates = await getNonBaseCurrenciesRates({ baseCurrency, transactionsByWallet: periodTransactionsByWallet, userCurrency });

    // Get the data
    const periodTransactions = periodTransactionsByWallet.flatMap(wallet => wallet.transactions);
    const financialScore = await getUserFinancialScore(periodTransactions, baseCurrency, nonBaseCurrenciesRates);

    const balanceOverTimeChartData = await getUserBalanceChartData({
      userId,
      periodInfo,
      trackBalanceChange: true,
      providedData: {
        wallets: allWallets,
        periodTransactionsByWallet,
        baseCurrency,
        userCurrency,
        nonBaseCurrenciesRates,
      }
    });

    const expensesByCategoryChartData = await getCashFlowByCategoryChartData({
      type: "expense",
      periodInfo,
      providedData: {
        periodTransactionsByWallet,
        baseCurrency,
        nonBaseCurrenciesRates
      },
      convertToBaseCurrency: true
    });

    const incomeByCategoryChartData = await getCashFlowByCategoryChartData({
      type: "income",
      periodInfo,
      providedData: {
        periodTransactionsByWallet,
        baseCurrency,
        nonBaseCurrenciesRates
      },
      convertToBaseCurrency: true
    });

    const cashFlowOverTimeChartData = await getCashFlowChartData({
      periodInfo,
      providedData: {
        allWallets,
        periodTransactionsByWallet,
        userCurrency,
        baseCurrency,
        nonBaseCurrenciesRates
      }
    });

    const loaderData = {
      financialScore,
      chartData: {
        balanceOverTime: balanceOverTimeChartData,
        expensesByCategory: expensesByCategoryChartData,
        incomeByCategory: incomeByCategoryChartData,
        cashFlowOverTime: cashFlowOverTimeChartData
      }
    }

    return createSuccessResponse(loaderData);
  } catch (error) {
    console.error(error);

    throw createErrorResponse("Sorry, we couldn't load your stats. Please try again and contact us at yoan.zagorov@gmail.com if the issue persists");
  }
}