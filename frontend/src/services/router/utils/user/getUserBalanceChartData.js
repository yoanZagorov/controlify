import { collection, where } from "firebase/firestore";

import { getTransactions } from "@/services/firebase/db/transaction";
import { getWallets } from "@/services/firebase/db/wallet";
import { getPeriodInfo } from "@/services/router/utils";

import { db } from "@/services/firebase/firebase.config";
import { getBaseCurrency } from "@/services/firebase/db/currencies";
import getUserBalance from "./getUserBalance";
import { getNonBaseCurrenciesRates } from "@/utils/currency";
import { performDecimalCalculation } from "@/utils/number";
import { getBalanceChartDataDays } from "@/utils/charts";

export default async function getUserBalanceChartData({ userId, period, userCurrency }) {
  const { start, end, periodLength } = getPeriodInfo(period);

  const walletsCollectionRef = collection(db, `users/${userId}/wallets`);
  const allWallets = await getWallets(walletsCollectionRef);

  const transactionsQuery = [
    where("date", ">=", start),
    where("date", "<=", end)
  ];
  const periodTransactionsByWallet = await getTransactions({ userId, wallets: allWallets, query: transactionsQuery, dataFormat: "structured" });

  const baseCurrency = await getBaseCurrency();
  const nonBaseCurrenciesRates = await getNonBaseCurrenciesRates(periodTransactionsByWallet, baseCurrency, userCurrency);

  // Calculate balance before start of period
  const openingBalanceTransactionsQuery = [
    where("date", "<", start)
  ];
  const openingBalance = await getUserBalance({ userId, wallets: allWallets, query: openingBalanceTransactionsQuery, userCurrency, nonBaseCurrenciesRates });

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
  const days = getBalanceChartDataDays(periodLength, period, openingBalance, transactionsByDayMap);

  return days;
}