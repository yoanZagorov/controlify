import { performDecimalCalculation } from "@/utils/number";
import { convertTransactionsToPreferredCurrency } from "../currency";

export default async function getUserFinancialScore(periodTransactions, preferredCurrency = null, providedBaseCurrency = null) {
  // Convert to preferred currency if not already done
  if (!periodTransactions[0].convertedAmount) {
    await convertTransactionsToPreferredCurrency(periodTransactions, preferredCurrency, providedBaseCurrency);
  }

  const FINANCIAL_SCORE_AMOUNTS = {
    MIN: 0,
    MAX: 100,
    BREAK_EVEN: 50
  }

  if (!periodTransactions.length) return null;

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
  const financialScore =
    Math.trunc(
      Math.max(
        FINANCIAL_SCORE_AMOUNTS.MIN,
        Math.min(
          FINANCIAL_SCORE_AMOUNTS.MAX,
          (((incomeAmount - expenseAmount) / incomeAmount) * FINANCIAL_SCORE_AMOUNTS.BREAK_EVEN) + FINANCIAL_SCORE_AMOUNTS.BREAK_EVEN
        )
      )
    );

  return financialScore;
}