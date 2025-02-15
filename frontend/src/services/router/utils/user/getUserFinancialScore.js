import { performDecimalCalculation } from "@/utils/number";
import { convertTransactionsToPreferredCurrency } from "../currency";
import { isArrayTruthy } from "@/utils/array";

export default async function getUserFinancialScore(periodTransactions, preferredCurrency = null, providedBaseCurrency = null) {
  // Convert to preferred currency if not already done
  if (isArrayTruthy(periodTransactions) && !periodTransactions[0].convertedAmount) {
    await convertTransactionsToPreferredCurrency(periodTransactions, preferredCurrency, providedBaseCurrency);
  }

  const FINANCIAL_SCORE_AMOUNTS = {
    MIN: 0,
    MAX: 100,
    BREAK_EVEN: 50
  }

  // Return early if there are no transactions
  if (!isArrayTruthy(periodTransactions)) return FINANCIAL_SCORE_AMOUNTS.BREAK_EVEN;

  let incomeAmount = 0;
  let expenseAmount = 0;

  for (const transaction of periodTransactions) {
    const { convertedAmount, type } = transaction;

    if (type === "income") {
      incomeAmount = performDecimalCalculation(incomeAmount, convertedAmount, "+", 4);
    } else {
      expenseAmount = performDecimalCalculation(expenseAmount, convertedAmount, "+", 4);
    }
  }

  // Simple formula to calculate a rough financial score
  // To do (Non-MVP): create a more sophisticated formula
  const financialScore =
    Math.trunc(
      Math.max(
        FINANCIAL_SCORE_AMOUNTS.MIN,
        Math.min(
          FINANCIAL_SCORE_AMOUNTS.MAX,
          FINANCIAL_SCORE_AMOUNTS.BREAK_EVEN + FINANCIAL_SCORE_AMOUNTS.BREAK_EVEN * ((incomeAmount - expenseAmount) / (incomeAmount + expenseAmount))
        )
      )
    );

  return financialScore;
}