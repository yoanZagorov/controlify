import { performDecimalCalculation } from '#/utils/number'

// Currencies in the db hold conversion rate references only to the base currency
export default function convertAmountToPreferredCurrency({
  amount,
  currency,
  baseCurrency,
  preferredCurrency,
  nonBaseCurrenciesRates,
}) {
  let baseCurrencyAmount = amount
  if (currency !== baseCurrency.code) {
    baseCurrencyAmount = performDecimalCalculation(
      amount,
      nonBaseCurrenciesRates[currency],
      '*',
      4,
    )
  }

  let convertedAmount = baseCurrencyAmount
  if (baseCurrency.code !== preferredCurrency) {
    convertedAmount = performDecimalCalculation(
      baseCurrencyAmount,
      nonBaseCurrenciesRates[preferredCurrency],
      '/',
      4,
    )
  }

  return parseFloat(convertedAmount.toFixed(2))
}
