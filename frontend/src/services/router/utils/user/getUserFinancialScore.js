import { performDecimalCalculation } from "@/utils/number";

export default async function getUserFinancialScore(periodTransactions, baseCurrency, nonBaseCurrenciesRates) {
  const FINANCIAL_SCORE_AMOUNTS = {
    MIN: 0,
    MAX: 100,
    BREAK_EVEN: 50
  }

  if (!periodTransactions.length) return null;

  let incomeAmount = 0;
  let expenseAmount = 0;

  for (const transaction of periodTransactions) {
    const { amount, category: { type }, wallet: { currency } } = transaction;

    let amountInBaseCurrency = amount;
    if (currency !== baseCurrency.code) {
      amountInBaseCurrency = performDecimalCalculation(transaction.amount, nonBaseCurrenciesRates[currency], "*", 4);
    }

    if (type === "income") {
      incomeAmount = performDecimalCalculation(incomeAmount, amountInBaseCurrency, "+", 4);
    } else {
      expenseAmount = performDecimalCalculation(expenseAmount, amountInBaseCurrency, "+", 4);
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