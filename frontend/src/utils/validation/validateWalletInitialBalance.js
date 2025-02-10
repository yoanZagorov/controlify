import { VALIDATION_RULES } from "@/constants";
import { ValidationError } from "../errors";

export default function validateWalletInitialBalance(initialBalance) {
  if (initialBalance === "") {
    throw new ValidationError("Initial balance should not be empty");
  }

  if (isNaN(initialBalance) || !VALIDATION_RULES.AMOUNT.REGEX.test(initialBalance)) {
    throw new ValidationError("Initial balance should be a valid monetary value (e.g. 100.00). Please try again");
  }

  if (initialBalance < VALIDATION_RULES.WALLET.INITIAL_BALANCE.MIN_AMOUNT || initialBalance > VALIDATION_RULES.WALLET.INITIAL_BALANCE.MAX_AMOUNT) {
    throw new ValidationError("Initial balance should be between 0 and 999,999.99. Please try again");
  }
}