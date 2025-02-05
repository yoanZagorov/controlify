import { getPeriodTransactionsByWallet } from "@/services/firebase/db/transaction";
import { COLORS } from "@/constants";
import { performDecimalCalculation } from "@/utils/number";

// No need for conversion (for now) - used only for a single wallet (the same currency)
export default async function getExpensesVsIncomeChartData({ userId, wallets, periodInfo, providedPeriodTransactions }) {
  // To do - declare colors as constants in src/constants
  let periodTransactions = providedPeriodTransactions;
  if (!periodTransactions) {
    const periodTransactionsByWallet = await getPeriodTransactionsByWallet({ userId, prefetchedAllWallets: wallets, periodInfo });
    periodTransactions = periodTransactionsByWallet.flatMap(wallet => wallet.transactions);
  }

  const expenseTransactions = { name: "expense", fill: COLORS.THEME.RED.DARK, amount: 0 };
  const incomeTransactions = { name: "income", fill: COLORS.THEME.GREEN.DARK, amount: 0 };

  periodTransactions.forEach(transaction => {
    const { amount, category: { type } } = transaction;

    if (type === "expense") {
      expenseTransactions.amount = performDecimalCalculation(expenseTransactions.amount, amount, "+");
    } else {
      incomeTransactions.amount = performDecimalCalculation(incomeTransactions.amount, amount, "+");
    }
  });

  return [expenseTransactions, incomeTransactions];
}