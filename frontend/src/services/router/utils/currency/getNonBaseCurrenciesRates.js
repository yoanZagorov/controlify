import { getEntities } from "@/services/firebase/db/utils/entity";
import { db } from "@/services/firebase/firebase.config";
import { collection, where } from "firebase/firestore";

// Only one amongst transactionsByWallet and providedNonBaseCurrenciesSet should be provided - they're mutually exclusive
export default async function getNonBaseCurrenciesRates({ baseCurrency, transactionsByWallet = [], providedNonBaseCurrenciesSet = null, userCurrency = null }) {
  let nonBaseCurrenciesSet = providedNonBaseCurrenciesSet;
  if (!nonBaseCurrenciesSet) {
    nonBaseCurrenciesSet = new Set();
    transactionsByWallet.forEach(wallet => {
      if (wallet.currency !== baseCurrency.code && wallet.transactions) {
        nonBaseCurrenciesSet.add(wallet.currency);
      }
    })
  }

  if (userCurrency) {
    const isPreferredCurrencyBase = userCurrency === baseCurrency.code;
    if (!isPreferredCurrencyBase) {
      nonBaseCurrenciesSet.add(userCurrency);
    }
  }

  let nonBaseCurrenciesRates = {};
  if (nonBaseCurrenciesSet.size) {
    const currenciesCollectionRef = collection(db, "currencies");
    const nonBaseCurrenciesQuery = [
      where("code", "in", [...nonBaseCurrenciesSet])
    ];
    const fetchedCurrencies = await getEntities(currenciesCollectionRef, "currencies", nonBaseCurrenciesQuery);
    nonBaseCurrenciesRates = Object.fromEntries(fetchedCurrencies.map(currency => [currency.code, currency.conversionRate]));
  }

  return nonBaseCurrenciesRates;
}