import { performDecimalCalculation } from "@/utils/number";

export default function convertAmountToUserCurrency({ amount, currency, baseCurrency, userCurrency, nonBaseCurrenciesRates }) {
  let baseCurrencyAmount = amount;
  if (currency !== baseCurrency.code) {
    baseCurrencyAmount = performDecimalCalculation(baseCurrencyAmount, nonBaseCurrenciesRates[currency], "*", 4);
  }

  let convertedAmount = baseCurrencyAmount;
  if (baseCurrency.code !== userCurrency) {
    convertedAmount = performDecimalCalculation(convertedAmount, nonBaseCurrenciesRates[userCurrency], "/", 4);
  }

  return convertedAmount;
}