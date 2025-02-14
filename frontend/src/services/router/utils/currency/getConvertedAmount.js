import { getBaseCurrency, getCurrencies } from "@/services/firebase/db/currency";
import { isArrayTruthy } from "@/utils/array";
import { performDecimalCalculation } from "@/utils/number";
import { where } from "firebase/firestore";

export default async function getConvertedAmount(oldCurrencyCode, newCurrencyCode, oldAmount, providedCurrencies = []) {
  const isProvidedCurrencies = isArrayTruthy(providedCurrencies);

  const baseCurrency = await getBaseCurrency();

  let amountInBaseCurrency = oldAmount;
  if (oldCurrencyCode !== baseCurrency.code) {
    let oldCurrency;
    if (isProvidedCurrencies) {
      oldCurrency = providedCurrencies.find(currency => currency.code === oldCurrencyCode);
    } else {
      const oldCurrencyQuery = [where("code", "==", oldCurrencyCode)]
      oldCurrency = (await getCurrencies(oldCurrencyQuery))[0];
    }

    amountInBaseCurrency = performDecimalCalculation(oldAmount, oldCurrency.conversionRate, "*", 4);
  }

  let newAmount = amountInBaseCurrency;
  if (newCurrencyCode !== baseCurrency.code) {
    let newCurrency;
    if (isProvidedCurrencies) {
      newCurrency = providedCurrencies.find(currency => currency.code === newCurrencyCode);
    } else {
      const newCurrencyQuery = [where("code", "==", newCurrencyCode)]
      newCurrency = (await getCurrencies(newCurrencyQuery))[0];
    }

    newAmount = performDecimalCalculation(amountInBaseCurrency, newCurrency.conversionRate, "/", 4);
  }

  return parseFloat(newAmount.toFixed(2));;
}