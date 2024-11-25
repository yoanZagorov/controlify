import { getTransactions } from "@/services/firebase/db/transaction";
import { where } from "firebase/firestore";

export default async function getExpensesVsIncomeChartData({ userId, wallets, period, transactions }) {
  let periodTransactions = transactions;

  if (!periodTransactions) {
    const { start, end } = period;

    const transactionsQuery = [
      where("date", ">=", start),
      where("date", "<=", end)
    ];

    periodTransactions = await getTransactions(userId, wallets, transactionsQuery);
  }
}