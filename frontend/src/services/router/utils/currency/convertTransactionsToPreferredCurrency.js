import { getBaseCurrency } from "#services/firebase/db/currency";
import { convertAmountToPreferredCurrency } from "#utils/currency";
import getNonBaseCurrenciesRates from "./getNonBaseCurrenciesRates";

// If ended up converting the transactions, the baseCurrency and nonBaseCurrencyRates were most likely not readily available. So they can be fetched here 
export default async function convertTransactionsToPreferredCurrency(transactions, preferredCurrency, providedBaseCurrency = null) {
  let baseCurrency = providedBaseCurrency;
  if (!baseCurrency) {
    baseCurrency = await getBaseCurrency();
  }

  // Get all of the nonBaseCurrenciesRates in a single call
  const nonBaseCurrenciesRates = await getNonBaseCurrenciesRates({ baseCurrency, entities: transactions, preferredCurrency });

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