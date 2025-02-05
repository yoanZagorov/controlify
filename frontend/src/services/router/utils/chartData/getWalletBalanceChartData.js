import { where } from "firebase/firestore";

import { getTransactions } from "@/services/firebase/db/transaction";

import { getBalanceChartDataDays } from "@/utils/charts";
import { performDecimalCalculation } from "@/utils/number";

export default async function getWalletBalanceChartData({ userId, wallet, periodInfo, periodTransactions }) {
  const { start } = periodInfo;

  // Calculate balance before start of period
  const openingBalanceTransactionsQuery = [
    where("date", "<", start)
  ];
  const transactionsBeforeStartOfPeriod = await getTransactions({ userId, providedWallets: [wallet], query: openingBalanceTransactionsQuery });

  const openingBalance = transactionsBeforeStartOfPeriod.reduce((acc, transaction) => {
    const { amount, category: { type } } = transaction;

    const operator = type === "expense" ? "-" : "+";
    return performDecimalCalculation(acc, amount, operator);
  }, 0);

  // Create a period map by each day
  let transactionsByDayMap = {};
  for (const transaction of periodTransactions) {
    const dateKey = transaction.date.toDateString();

    if (!transactionsByDayMap[dateKey]) transactionsByDayMap[dateKey] = [];
    transactionsByDayMap[dateKey].push(transaction);
  }

  // Calculate the balance for each individual day
  const days = getBalanceChartDataDays({ periodInfo, openingBalance, transactionsByDayMap });

  return { openingBalance, balanceOverTimeChartData: days };
}