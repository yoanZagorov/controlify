import { where } from "firebase/firestore";
import { getLastThirtyDaysStartandEnd } from "../date";
import { performDecimalCalculation } from "../number";
import { getTransactions } from "services/firebase/db/transaction";

export default async function getExpensesByWalletChartData(userId, allWallets) {
  const { start, end } = getLastThirtyDaysStartandEnd();

  const transactionsQuery = [
    where("date", ">=", start),
    where("date", "<=", end)
  ];

  const lastThirtyDaysTransactionsByWallet = await getTransactions(userId, allWallets, transactionsQuery);

  const expensesByWallet = lastThirtyDaysTransactionsByWallet.map(wallet => {
    const expenseTransactions = wallet.transactions.filter(transaction => transaction.category.type === "expense");

    const totalExpenses = expenseTransactions.reduce((acc, transaction) =>
      performDecimalCalculation(acc, transaction.amount, "+"), 0);

    return { name: wallet.name, expenses: totalExpenses, wallet: { id: wallet.id, iconName: wallet.iconName }, fill: wallet.color };
  })

  return expensesByWallet;
}