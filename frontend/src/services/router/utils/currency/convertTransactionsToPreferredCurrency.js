import { getBaseCurrency } from "@/services/firebase/db/currency";
import getNonBaseCurrenciesRates from "./getNonBaseCurrenciesRates";
import { convertAmountToPreferredCurrency } from "@/utils/currency";

// If ended up converting the transactions, the baseCurrency and nonBaseCurrencyRates were most likely not readily unavailable. So they're directly fetched here 
export default async function convertTransactionsToPreferredCurrency(transactions, preferredCurrency, providedBaseCurrency = null) {
  let baseCurrency = providedBaseCurrency;
  if (!baseCurrency) {
    baseCurrency = await getBaseCurrency();
  }

  const nonBaseCurrenciesRates = await getNonBaseCurrenciesRates({ baseCurrency, entites: transactions, preferredCurrency });

  for (const transaction of transactions) {
    const { amount, currency } = transaction;

    let convertedAmount = amount;
    if (currency !== preferredCurrency) {
      convertedAmount = convertAmountToPreferredCurrency({
        amount,
        currency,
        baseCurrency,
        preferredCurrency,
        nonBaseCurrenciesRates
      });
    }

    transaction.convertedAmount = convertedAmount;
  }
}