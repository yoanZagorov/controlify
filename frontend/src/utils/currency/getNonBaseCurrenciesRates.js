import { getEntities } from "@/services/firebase/db/utils/entity";
import { db } from "@/services/firebase/firebase.config";
import { collection, where } from "firebase/firestore";

export default async function getNonBaseCurrenciesRates(transactionsByWallet, baseCurrency, userCurrency) {
  const nonBaseCurrenciesSet = new Set();
  transactionsByWallet.forEach(wallet => {
    if (wallet.currency !== baseCurrency.code && wallet.transactions) {
      nonBaseCurrenciesSet.add(wallet.currency);
    }
  })

  const isPreferredCurrencyBase = userCurrency === baseCurrency.code;
  if (!isPreferredCurrencyBase) {
    nonBaseCurrenciesSet.add(userCurrency);
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