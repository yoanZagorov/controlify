import { where } from "firebase/firestore";
import { getCurrencies } from "@/services/firebase/db/currency";

// Fetch the needed currency rates all at once
export default async function getNonBaseCurrenciesRates({ baseCurrency, transactionsByWallet = [], userCurrency = null }) {
  // Create a Set of unique currencies
  const nonBaseCurrenciesSet = new Set();
  transactionsByWallet.forEach(wallet => {
    if (wallet.currency !== baseCurrency.code && wallet.transactions) {
      nonBaseCurrenciesSet.add(wallet.currency);
    }
  })

  // Include the user currency if different from the base
  if (userCurrency) {
    const isPreferredCurrencyBase = userCurrency === baseCurrency.code;
    if (!isPreferredCurrencyBase) {
      nonBaseCurrenciesSet.add(userCurrency);
    }
  }

  // Create currency lookup table
  let nonBaseCurrenciesRates = {};
  if (nonBaseCurrenciesSet.size) {
    const nonBaseCurrenciesQuery = [
      where("code", "in", [...nonBaseCurrenciesSet])
    ];
    const nonBaseCurrencies = await getCurrencies(nonBaseCurrenciesQuery);
    // Turn the array into a lookup table
    nonBaseCurrenciesRates = Object.fromEntries(nonBaseCurrencies.map(currency => [currency.code, currency.conversionRate]));
  }

  return nonBaseCurrenciesRates;
}