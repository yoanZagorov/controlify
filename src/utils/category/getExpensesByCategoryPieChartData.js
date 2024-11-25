import { where } from "firebase/firestore";
import { getLastThirtyDaysStartandEnd } from "../date";
import { getTransactions } from "@/services/firebase/db/transaction";
import { performDecimalCalculation } from "../number";

export default async function getExpensesByCategoryPieChartData(userId, wallets) {
  const { start, end } = getLastThirtyDaysStartandEnd();

  const transactionsQuery = [
    where("date", ">=", start),
    where("date", "<=", end)
  ];

  const lastThirtyDaysTransactionsByWallet = await getTransactions(userId, wallets, transactionsQuery);
  const lastThirtyDaysTransactions = lastThirtyDaysTransactionsByWallet.flatMap(wallet => wallet.transactions);

  const expenseTransactions = lastThirtyDaysTransactions.filter(transaction => transaction.category.type === "expense");

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