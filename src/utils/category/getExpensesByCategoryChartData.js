import { where } from "firebase/firestore";
import { getTransactions } from "@/services/firebase/db/transaction";
import { performDecimalCalculation } from "../number";

export default async function getExpensesByCategoryChartData({ userId, wallets, period, transactions }) {
  let periodTransactions = transactions;

  if (!periodTransactions) {
    const { start, end } = period;

    const transactionsQuery = [
      where("date", ">=", start),
      where("date", "<=", end)
    ];

    periodTransactions = await getTransactions({ userId, wallets, query: transactionsQuery });
  }

  const expenseTransactions = periodTransactions.filter(transaction => transaction.category.type === "expense");

  if (!expenseTransactions.length) return [];

  const expensesByCategoryMap = new Map();

  expenseTransactions.forEach(transaction => {
    const { category: { id, name, iconName, color }, amount } = transaction;

    if (expensesByCategoryMap.has(name)) {
      const currentCategory = expensesByCategoryMap.get(name);
      currentCategory.amount = performDecimalCalculation(currentCategory.amount, amount, "+");
    } else {
      expensesByCategoryMap.set(name, {
        name,
        amount,
        fill: color,
        category: {
          id,
          iconName,
        }
      });
    }
  });

  const expensesByCategory = Array.from(expensesByCategoryMap.values());

  return expensesByCategory;
}