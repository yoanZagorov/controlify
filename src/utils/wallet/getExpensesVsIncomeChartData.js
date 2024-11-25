import { getTransactions } from "@/services/firebase/db/transaction";
import { where } from "firebase/firestore";
import { performDecimalCalculation } from "../number";

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

  const expenseTransactionsAmount = { name: "expenses", fill: "#CC0000", amount: 0 };
  const incomeTransactionsAmount = { name: "income", fill: "#008000", amount: 0 };

  periodTransactions.forEach(transaction => {
    if (transaction.category.type === "expense") {
      expenseTransactionsAmount.amount = performDecimalCalculation(expenseTransactionsAmount.amount, transaction.amount, "+");
    } else {
      incomeTransactionsAmount.amount = performDecimalCalculation(incomeTransactionsAmount.amount, transaction.amount, "+");
    }
  });

  return [expenseTransactionsAmount, incomeTransactionsAmount];
}