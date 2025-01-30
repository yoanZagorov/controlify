import { collection, where } from "firebase/firestore";

import { getBalance } from "@/services/firebase/db/user";
import { getTransactions } from "@/services/firebase/db/transaction";
import { getWallets } from "@/services/firebase/db/wallet";
import { getPeriodInfo } from "@/services/router/utils";

import { performDecimalCalculation } from "../number";
import { db } from "@/services/firebase/firebase.config";
import { getBaseCurrency } from "@/services/firebase/db/currencies";
import { getNonBaseCurrenciesRates } from "../currency";

export default async function getBalanceChartData({ userId, wallets = [], period, transactionsByWallet = [], userCurrency }) {
  const { start, end, periodLength } = getPeriodInfo(period);

  // Avoid unnecessary fetches if data is already available
  let allWallets = wallets;
  if (!allWallets.length) {
    const walletsCollectionRef = collection(db, `users/${userId}/wallets`);
    allWallets = await getWallets(walletsCollectionRef);
  }

  let periodTransactionsByWallet = transactionsByWallet;
  if (!periodTransactionsByWallet.length) {
    const transactionsQuery = [
      where("date", ">=", start),
      where("date", "<=", end)
    ];

    periodTransactionsByWallet = await getTransactions({ userId, wallets: allWallets, query: transactionsQuery, dataFormat: "structured" });
  }

  const baseCurrency = await getBaseCurrency();
  const nonBaseCurrenciesRates = await getNonBaseCurrenciesRates(periodTransactionsByWallet, baseCurrency, userCurrency);

  // Calculate balance before start of period
  const openingBalanceTransactionsQuery = [
    where("date", "<", start)
  ];
  const openingBalance = await getBalance({ userId, wallets: allWallets, query: openingBalanceTransactionsQuery, userCurrency });
  console.log(openingBalance);

  const periodTransactions = periodTransactionsByWallet.flatMap(wallet => wallet.transactions);

  let transactionsByDayMap = {};
  for (const transaction of periodTransactions) {
    const currency = transaction.wallet.currency;

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

  const days = Array.from({ length: periodLength }, (_, i) => {
    const day = new Date();
    day.setDate(day.getDate() - (periodLength - i));

    let presentationKey;

    switch (period) {
      case "lastThirtyDays":
        presentationKey = `${day.getDate()}/${day.getMonth() + 1}`;
        break;
    }

    const dateKey = day.toDateString();

    return { dateKey, presentationKey, balance: 0 };
  });

  let accumulatedBalance = openingBalance;

  days.forEach(day => {
    const currentDayTransactions = transactionsByDayMap[day.dateKey] || [];

    if (currentDayTransactions.length) {
      const dayBalance = currentDayTransactions.reduce((acc, transaction) => {
        const operator = transaction.category.type === "expense" ? "-" : "+";

        return performDecimalCalculation(acc, transaction.amount, operator);
      }, 0)

      accumulatedBalance = performDecimalCalculation(accumulatedBalance, dayBalance, "+");
    }

    day.balance = accumulatedBalance;
  })

  return { openingBalance, balanceChartData: days };
}