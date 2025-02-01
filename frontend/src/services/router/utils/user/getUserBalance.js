import { performDecimalCalculation } from "@/utils/number";
import { getBaseCurrency } from "@/services/firebase/db/currencies";
import { getTransactions } from "@/services/firebase/db/transaction";

export default async function getUserBalance({ userId, wallets, query, userCurrency, nonBaseCurrenciesRates }) {
  // Fetch only the neccessary conversion rates, but do it in a single call
  const baseCurrency = await getBaseCurrency();

  // To do: use the prefetched data if already available
  const transactions = await getTransactions({ userId, wallets, query });
  if (!transactions.length) return 0;

  const balance = transactions.reduce((acc, transaction) => {
    const currency = transaction.wallet.currency;

    // Convert all transaction amounts to the base currency if not already in it
    let amountInBaseCurrency = transaction.amount;
    if (currency !== baseCurrency.code) {
      const conversionRate = nonBaseCurrenciesRates[currency];
      amountInBaseCurrency = performDecimalCalculation(transaction.amount, conversionRate, "*", 4);
    }

    const operator = transaction.category.type === "expense" ? "-" : "+";
    return performDecimalCalculation(acc, amountInBaseCurrency, operator);
  }, 0);

  const isPreferredCurrencyBase = userCurrency === baseCurrency.code;
  const balanceInPreferredCurrency = isPreferredCurrencyBase
    ? balance
    : performDecimalCalculation(balance, nonBaseCurrenciesRates[userCurrency], "/", 4);

  return parseFloat(balanceInPreferredCurrency.toFixed(2));
}