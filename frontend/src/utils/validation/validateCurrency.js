import { VALIDATION_RULES } from "@/constants";
import { ValidationError } from "../errors";

export default function validateCurrency(currencyCode, supportedCurrencyCodes) {
  if (!currencyCode) {
    throw new ValidationError("Currency should not be empty");
  }

  if (!VALIDATION_RULES.CURRENCY_CODE_REGEX.test(currencyCode)) {
    throw new ValidationError("Invalid currency code format. Please try again");
  }

  if (!supportedCurrencyCodes.includes(currencyCode)) {
    throw new ValidationError("Unsupported currency. Please try with another one");
  }
}