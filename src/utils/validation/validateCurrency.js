import { ValidationError } from "../errors";

export default function validateCurrency(currency) {
  const currencyRegex = /^[A-Z]{3}$/;
  const supportedCurrencies = ["BGN", "EUR", "USD", "GBP"];

  if (!currency) {
    throw new ValidationError("Currency should not be empty!");
  }

  if (!currencyRegex.test(currency)) {
    throw new ValidationError("Invalid currency format!");
  }

  if (!supportedCurrencies.includes(currency)) {
    throw new ValidationError("Unsupported currency!");
  }
}