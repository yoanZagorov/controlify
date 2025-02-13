import { getBaseCurrency } from "@/services/firebase/db/currency";
import { getEntities } from "@/services/firebase/db/utils/entity";
import { db } from "@/services/firebase/firebase.config";
import { isArrayTruthy } from "@/utils/array";
import { performDecimalCalculation } from "@/utils/number";
import { collection, where } from "firebase/firestore";

export default async function getConvertedWalletBalance(oldCurrencyCode, newCurrencyCode, oldBalance, providedCurrencies = []) {
  const isProvidedCurrencies = isArrayTruthy(providedCurrencies);

  // Only need the collection ref if the currencies aren't provided
  const currenciesCollectionRef = isProvidedCurrencies
    ? null
    : collection(db, "currencies");

  const baseCurrency = await getBaseCurrency();

  let balanceInBaseCurrency = oldBalance;
  if (oldCurrencyCode !== baseCurrency.code) {
    let oldCurrency;
    if (isProvidedCurrencies) {
      oldCurrency = providedCurrencies.find(currency => currency.code === oldCurrencyCode);
    } else {
      const oldCurrencyQuery = [
        where("code", "==", oldCurrencyCode)
      ]
      oldCurrency = (await getEntities(currenciesCollectionRef, "currencies", oldCurrencyQuery))[0];
    }

    balanceInBaseCurrency = performDecimalCalculation(oldBalance, oldCurrency.conversionRate, "*", 4);
  }

  let newBalance = balanceInBaseCurrency;
  if (newCurrencyCode !== baseCurrency.code) {
    let newCurrency;
    if (isProvidedCurrencies) {
      newCurrency = providedCurrencies.find(currency => currency.code === newCurrencyCode);
    } else {
      const newCurrencyQuery = [
        where("code", "==", newCurrencyCode)
      ]
      newCurrency = (await getEntities(currenciesCollectionRef, "currencies", newCurrencyQuery))[0];
    }

    newBalance = performDecimalCalculation(balanceInBaseCurrency, newCurrency.conversionRate, "/", 4);
  }

  return parseFloat(newBalance.toFixed(2));;
}