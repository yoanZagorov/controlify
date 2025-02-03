import { where } from "firebase/firestore";

import { getPeriodInfo } from "@/services/router/utils";

import { getBalanceChartDataDays } from "@/utils/charts";
import { getTransactions } from "@/services/firebase/db/transaction";
import { performDecimalCalculation } from "@/utils/number";

export default async function getWalletBalanceChartData({ userId, wallet, period, periodTransactions }) {
  const { start, periodLength } = getPeriodInfo(period);

  // Calculate balance before start of period
  const openingBalanceTransactionsQuery = [
    where("date", "<", start)
  ];
  const transactions = await getTransactions({ userId, wallets: [wallet], query: openingBalanceTransactionsQuery });
  if (!transactions.length) return 0;

  const openingBalance = transactions.reduce((acc, transaction) => {
    const operator = transaction.category.type === "expense" ? "-" : "+";

    return performDecimalCalculation(acc, transaction.amount, operator);
  }, 0);

  // Create a period map by each day
  let transactionsByDayMap = {};
  for (const transaction of periodTransactions) {
    const dateKey = transaction.date.toDateString();

    if (!transactionsByDayMap[dateKey]) transactionsByDayMap[dateKey] = [];
    transactionsByDayMap[dateKey].push(transaction);
  }

  // Calculate the balance for each individual day
  const days = getBalanceChartDataDays({ period, openingBalance, transactionsByDayMap });

  return { openingBalance, balanceChartData: days };
}