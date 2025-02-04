import { collection, where } from "firebase/firestore";

import { getPeriodTransactions, getTransactions } from "@/services/firebase/db/transaction";
import { getWallets } from "@/services/firebase/db/wallet";
import { getPeriodInfo } from "@/services/router/utils";

import { db } from "@/services/firebase/firebase.config";
import { getBaseCurrency } from "@/services/firebase/db/currency";
import { getNonBaseCurrenciesRates } from "@/utils/currency";
import { performDecimalCalculation } from "@/utils/number";
import { getBalanceChartDataDays, getCashFlowLineChartDataDays } from "@/utils/charts";
import { getUser } from "../user";

// Convert balance to base currency and then to user currency. Used in reflect loader
export default async function getCashFlowChartData({ userId, period, prefetchedData }) {
  // Fetch the data that isn't provided
  let allWallets = prefetchedData.allWallets;
  if (!allWallets) {
    const walletsCollectionRef = collection(db, `users/${userId}/wallets`);
    allWallets = await getWallets(walletsCollectionRef);
  }

  let periodTransactionsByWallet = prefetchedData.periodTransactionsByWallet;
  if (!periodTransactionsByWallet) {
    const { start, end } = getPeriodInfo(period);
    const transactionsQuery = [
      where("date", ">=", start),
      where("date", "<=", end)
    ];

    periodTransactionsByWallet = await getTransactions({
      userId,
      wallets: allWallets,
      query: transactionsQuery,
      dataFormat: "structured"
    });
  }

  let baseCurrency = prefetchedData.baseCurrency;
  if (!baseCurrency) {
    baseCurrency = await getBaseCurrency();
  }

  let userCurrency = prefetchedData.userCurrency;
  if (!userCurrency) {
    ({ currency: userCurrency } = await getUser(userId));
  }

  let nonBaseCurrenciesRates = prefetchedData.nonBaseCurrenciesRates;
  if (!nonBaseCurrenciesRates) {
    nonBaseCurrenciesRates = await getNonBaseCurrenciesRates(periodTransactionsByWallet, baseCurrency, userCurrency);
  }

  // Create a period map by each day
  const periodTransactions = periodTransactionsByWallet.flatMap(wallet => wallet.transactions);
  let transactionsByDayMap = {};
  for (const transaction of periodTransactions) {
    const currency = transaction.wallet.currency;

    // Calculate the appropriate amount for each transaction
    let convertedTransactionAmount;
    if (currency !== userCurrency) {
      let baseCurrencyTransactionAmount = transaction.amount;
      if (currency !== baseCurrency.code) {
        baseCurrencyTransactionAmount = performDecimalCalculation(transaction.amount, nonBaseCurrenciesRates[currency], "*", 4);
      }

      convertedTransactionAmount = baseCurrencyTransactionAmount;
      if (baseCurrency.code !== userCurrency) {
        convertedTransactionAmount = performDecimalCalculation(baseCurrencyTransactionAmount, nonBaseCurrenciesRates[userCurrency], "/", 4);
      }
    }

    const dateKey = transaction.date.toDateString();

    if (!transactionsByDayMap[dateKey]) transactionsByDayMap[dateKey] = [];
    transactionsByDayMap[dateKey].push({
      ...transaction,
      ...(convertedTransactionAmount ? { amount: convertedTransactionAmount } : {})
    });
  }

  // Calculate the balance for each individual day
  const days = getCashFlowLineChartDataDays({ period, transactionsByDayMap });

  return days;
}