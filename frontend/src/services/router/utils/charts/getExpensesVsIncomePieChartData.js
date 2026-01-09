import { COLORS } from "#constants";

import { convertTransactionsToPreferredCurrency } from "#services/router/utils/currency";

import { isArrayTruthy } from "#utils/array";
import { performDecimalCalculation } from "#utils/number";

export default async function getExpensesVsIncomePieChartData(periodTransactions, preferredCurrency = null, providedBaseCurrency = null) {
  // Convert to preferred currency if not already done
  if (isArrayTruthy(periodTransactions) && !periodTransactions[0].convertedAmount) {
    await convertTransactionsToPreferredCurrency(periodTransactions, preferredCurrency, providedBaseCurrency);
  }

  const expenseTransactions = { name: "expense", fill: COLORS.THEME.RED.DARK, amount: 0 };
  const incomeTransactions = { name: "income", fill: COLORS.THEME.GREEN.DARK, amount: 0 };

  periodTransactions.forEach(transaction => {
    const { convertedAmount, type } = transaction;

    if (type === "expense") {
      expenseTransactions.amount = performDecimalCalculation(expenseTransactions.amount, convertedAmount, "+");
    } else {
      incomeTransactions.amount = performDecimalCalculation(incomeTransactions.amount, convertedAmount, "+");
    }
  });

  return [expenseTransactions, incomeTransactions];
}