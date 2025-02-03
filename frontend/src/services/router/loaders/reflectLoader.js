import { getBaseCurrency } from "@/services/firebase/db/currencies";
import { getAuthUserId, getUser } from "@/services/firebase/db/user";
import { getNonBaseCurrenciesRates } from "@/utils/currency";
import { getStoredData, storeRedirectData } from "@/utils/storage";
import { redirect } from "react-router";
import { getPeriodTransactions } from "@/services/firebase/db/transaction";
import { getUserBalanceChartData, getUserFinancialScore } from "../utils/user";
import { createErrorResponse, createSuccessResponse } from "../responses";
import { collection } from "firebase/firestore";
import { db } from "@/services/firebase/firebase.config";
import { getWallets } from "@/services/firebase/db/wallet";
import { getPeriodInfo } from "../utils";
import { getCashFlowByCategoryChartData } from "@/utils/category";
import { getCashFlowChartData } from "../utils/chartData";

export default async function reflectLoader() {
  const userId = await getAuthUserId();

  if (!userId) {
    const redirectData = getStoredData("redirectData");

    if (redirectData) {
      storeRedirectData(...redirectData);
    } else {
      const pathname = new URL(request.url).pathname;
      storeRedirectData("You must log in first", "alert", pathname);
    }

    return redirect("/login");
  }

  const DEFAULT_PERIOD = "lastThirtyDays";

  try {
    const allWalletsCollectionRef = collection(db, `users/${userId}/wallets`);
    const allWallets = await getWallets(allWalletsCollectionRef);

    const periodTransactionsByWallet = await getPeriodTransactions({ userId, wallets: allWallets, period: DEFAULT_PERIOD });

    const { currency: userCurrency } = (await getUser(userId));
    const baseCurrency = await getBaseCurrency();
    const nonBaseCurrenciesRates = await getNonBaseCurrenciesRates(periodTransactionsByWallet, baseCurrency);

    const periodTransactions = periodTransactionsByWallet.flatMap(wallet => wallet.transactions);

    const financialScore = await getUserFinancialScore(periodTransactions, baseCurrency, nonBaseCurrenciesRates);

    const balanceChartData = await getUserBalanceChartData({
      userId,
      period: DEFAULT_PERIOD,
      trackBalanceChange: true,
      prefetchedData: {
        allWallets,
        periodTransactionsByWallet,
        userCurrency,
        baseCurrency,
        nonBaseCurrenciesRates,
      }
    });

    const expensesByCategoryChartData = await getCashFlowByCategoryChartData({
      type: "expense",
      prefetchedData: {
        periodTransactions,
        baseCurrency,
        nonBaseCurrenciesRates
      }
    });

    const incomeByCategoryChartData = await getCashFlowByCategoryChartData({
      type: "income",
      prefetchedData: {
        periodTransactions,
        baseCurrency,
        nonBaseCurrenciesRates
      }
    });

    const cashFlowOverTimeChartData = await getCashFlowChartData({
      period: DEFAULT_PERIOD,
      prefetchedData: {
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
        balanceOverTime: balanceChartData,
        expensesByCategory: expensesByCategoryChartData,
        incomeByCategory: incomeByCategoryChartData,
        cashFlowOverTime: cashFlowOverTimeChartData
      }
    }

    return createSuccessResponse(loaderData);
  } catch (error) {
    // To do: create more specific error messages
    console.error(error);

    // To do: create a Firebase Firestore errors map

    throw createErrorResponse(500, "Sorry, we couldn't load your stats. Please try again");
  }
}