import { VALIDATION_RULES } from "@/constants";
import { ValidationError } from "../errors";
import { capitalize } from "../str";

export default function validateAmount(amount, minAmount, maxAmount, entity) {
  if (amount === "") {
    throw new ValidationError(`${capitalize(entity)} should not be empty`);
  }

  if (amount < minAmount || amount > maxAmount) {
    throw new ValidationError(`${capitalize(entity)} should be between ${minAmount} and ${maxAmount}. Please try again`);
  }

  if (isNaN(amount) || !VALIDATION_RULES.AMOUNT.REGEX.test(amount)) {
    throw new ValidationError(`${capitalize(entity)} should be a valid monetary value (e.g. 100.00). Please try again`);
  }

}