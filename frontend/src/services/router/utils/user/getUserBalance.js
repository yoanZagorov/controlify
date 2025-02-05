import { performDecimalCalculation } from "@/utils/number";
import { getTransactions } from "@/services/firebase/db/transaction";

// Convert balance to base currency and then to user currency. Used in appLoader
export default async function getUserBalance({ userId, wallets, query, baseCurrency, userCurrency, nonBaseCurrenciesRates }) {
  const transactions = await getTransactions({ userId, providedWallets: wallets, query });
  if (!transactions.length) return 0;

  const balance = transactions.reduce((acc, transaction) => {
    const { amount, wallet: { currency }, category: { type } } = transaction;

    // Convert all transaction amounts to the base currency if not already in it
    let amountInBaseCurrency = amount;
    if (currency !== baseCurrency.code) {
      const conversionRate = nonBaseCurrenciesRates[currency];
      amountInBaseCurrency = performDecimalCalculation(amount, conversionRate, "*", 4);
    }

    const operator = type === "expense" ? "-" : "+";
    return performDecimalCalculation(acc, amountInBaseCurrency, operator);
  }, 0);

  const isPreferredCurrencyBase = userCurrency === baseCurrency.code;
  const balanceInPreferredCurrency = isPreferredCurrencyBase
    ? balance
    : performDecimalCalculation(balance, nonBaseCurrenciesRates[userCurrency], "/", 4);

  return parseFloat(balanceInPreferredCurrency.toFixed(2));
}