import { getBalanceThirtyDaysAgo } from "services/firebase/db/user";
import { getLastThirtyDaysStartandEnd } from "../date";
import { where } from "firebase/firestore";
import { getTransactions } from "services/firebase/db/transaction";
import { getWallets } from "services/firebase/db/wallet";
import { performDecimalCalculation } from "../number";

export default async function getBalanceLineChartData(userId, wallets = []) {
  let allWallets;
  if (!wallets.length) {
    allWallets = await getWallets(userId)
  } else {
    allWallets = wallets;
  }

  const initialBalance = await getBalanceThirtyDaysAgo(userId, allWallets);

  const { start, end } = getLastThirtyDaysStartandEnd();
  const transactionsQuery = [
    where("date", ">=", start),
    where("date", "<=", end)
  ];
  const lastThirtyDaysTransactionsByWallet = await getTransactions(userId, allWallets, transactionsQuery);
  const lastThirtyDaysTransactions = lastThirtyDaysTransactionsByWallet.flatMap(wallet => wallet.transactions);

  const transactionsByDayMap = lastThirtyDaysTransactions.reduce((acc, transaction) => {
    const dateKey = transaction.date.toDateString();

    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(transaction);

    return acc;
  }, {})

  const days = Array.from({ length: 30 }, (_, i) => {
    const day = new Date();
    day.setDate(day.getDate() - (30 - i));

    const presentationKey = `${day.getDate()}/${day.getMonth() + 1}`;
    const dateKey = day.toDateString();

    return { dateKey, presentationKey, balance: 0 };
  });

  let accumulatedBalance = initialBalance;

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

  return { balanceThirtyDaysAgo: initialBalance, balanceChartData: days };
}