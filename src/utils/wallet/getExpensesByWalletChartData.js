import { where } from "firebase/firestore";
import { getLastThirtyDaysStartandEnd } from "../date";
import { performDecimalCalculation } from "../number";
import { getTransactions } from "@/services/firebase/db/transaction";

export default async function getExpensesByWalletChartData(userId, allWallets) {
  const { start, end } = getLastThirtyDaysStartandEnd();

  const transactionsQuery = [
    where("date", ">=", start),
    where("date", "<=", end)
  ];

  const lastThirtyDaysTransactionsByWallet = await getTransactions(userId, allWallets, transactionsQuery);

  const expensesByWallet = lastThirtyDaysTransactionsByWallet.map(wallet => {
    const { id, name, iconName, transactions, color } = wallet;

    const expenseTransactions = transactions.filter(transaction => transaction.category.type === "expense");

    const totalExpenses = expenseTransactions.reduce((acc, transaction) =>
      performDecimalCalculation(acc, transaction.amount, "+"), 0);

    return {
      name,
      amount: totalExpenses,
      fill: color,
      wallet: {
        id,
        iconName
      }
    };
  })

  return expensesByWallet;
}