import { collection, where } from "firebase/firestore";

import { getBalance } from "@/services/firebase/db/user";
import { getTransactions } from "@/services/firebase/db/transaction";
import { getWallets } from "@/services/firebase/db/wallet";
import { getPeriodInfo } from "@/services/router/utils";

import { performDecimalCalculation } from "../number";
import { db } from "@/services/firebase/firebase.config";

export default async function getBalanceChartData({ userId, wallets = [], period, transactions = [] }) {
  const { start, end, periodLength } = getPeriodInfo(period);

  // Avoid unnecessary fetches if data is already available

  let allWallets = wallets;
  if (!allWallets.length) {
    const walletsCollectionRef = collection(db, `users/${userId}/wallets`);
    allWallets = await getWallets(walletsCollectionRef);
  }

  let periodTransactions = transactions;
  if (!periodTransactions.length) {
    const transactionsQuery = [
      where("date", ">=", start),
      where("date", "<=", end)
    ];

    periodTransactions = await getTransactions({ userId, wallets, query: transactionsQuery });
  }

  const balanceQuery = [
    where("date", "<", start)
  ];

  const openingBalance = await getBalance(userId, allWallets, balanceQuery);

  const transactionsByDayMap = periodTransactions.reduce((acc, transaction) => {
    const dateKey = transaction.date.toDateString();

    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(transaction);

    return acc;
  }, {});

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