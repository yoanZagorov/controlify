import { where } from "firebase/firestore";
import { performDecimalCalculation } from "../number";
import { getTransactions } from "@/services/firebase/db/transaction";
import { getPeriodInfo } from "@/services/router/utils";

export default async function getExpensesByWalletChartData(userId, wallets, period) {
  const { start, end } = getPeriodInfo(period);

  const query = [
    where("date", ">=", start),
    where("date", "<=", end)
  ];

  const periodTransactionsByWallet = await getTransactions({ userId, wallets, query, dataFormat: "structured" });

  const expensesByWallet = periodTransactionsByWallet.map(wallet => {
    const { id, name, iconName, transactions, color } = wallet;

    // if (!transactions.length) return null;

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