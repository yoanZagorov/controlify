import { getBalanceThirtyDaysAgo } from "services/firebase/db/user";
import { getLastThirtyDaysStartandEnd } from "../date";
import { where } from "firebase/firestore";
import { getTransactions } from "services/firebase/db/transaction";
import { getWallets } from "services/firebase/db/wallet";
import { performDecimalCalculation } from "../number";

export default async function getBalanceChartData(userId) {
  const allWallets = await getWallets(userId);

  const initialBalance = await getBalanceThirtyDaysAgo(userId, allWallets);

  const { start, end } = getLastThirtyDaysStartandEnd();
  const transactionsQuery = [
    where("date", ">=", start),
    where("date", "<=", end)
  ];
  const lastThirtyDaysTransactionsByWallet = await getTransactions(userId, allWallets, transactionsQuery);
  const lastThirtyDaysTransactions = lastThirtyDaysTransactionsByWallet.flatMap(wallet => wallet.transactions);

  const transactionsByDayMap = lastThirtyDaysTransactions.reduce((acc, transaction) => {
    const dateKey = transaction.date.toDate().getDate();

    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(transaction);

    return acc;
  }, {})

  const days = Array.from({ length: 30 }, (_, i) => {
    const day = new Date();
    day.setDate(day.getDate() - (30 - i));

    return { date: day.getDate(), balance: 0 };
  });

  let accumulatedBalance = initialBalance;

  days.forEach(day => {
    const currentDayTransactions = transactionsByDayMap[day.date] || [];

    if (currentDayTransactions.length) {
      const dayBalance = currentDayTransactions.reduce((acc, transaction) => {
        const operator = transaction.type === "expense" ? "-" : "+";

        return performDecimalCalculation(acc, transaction.amount, operator);
      }, 0)

      accumulatedBalance = performDecimalCalculation(accumulatedBalance, dayBalance, "+");
    }

    day.balance = accumulatedBalance;
  })

  return days;
}