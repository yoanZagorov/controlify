import { performDecimalCalculation } from "@/utils/number";

export default async function getUserFinancialScore(periodTransactions, baseCurrency, nonBaseCurrenciesRates) {
  if (!periodTransactions.length) return null;

  let incomeTransactions = [];
  let expenseTransactions = [];

  for (const transaction of periodTransactions) {
    if (transaction.category.type === "income") {
      incomeTransactions.push(transaction);
    } else {
      expenseTransactions.push(transaction);
    }
  }

  function calculateAmount(transactions) {
    return transactions.reduce((acc, transaction) => {
      const currency = transaction.wallet.currency;

      let amountInBaseCurrency = transaction.amount;
      if (currency !== baseCurrency.code) {
        amountInBaseCurrency = performDecimalCalculation(transaction.amount, nonBaseCurrenciesRates[currency], "*", 4);
      }

      return performDecimalCalculation(acc, amountInBaseCurrency, "+");
    }, 0);
  }

  const incomeAmount = calculateAmount(incomeTransactions);
  const expenseAmount = calculateAmount(expenseTransactions);

  const financialScore = Math.trunc(Math.max(0, Math.min(100, (((incomeAmount - expenseAmount) / incomeAmount) * 50) + 50)));

  return financialScore;
}