import { ValidationError } from "../errors";

export default function checkWalletInitialBalance(initialBalance) {
  const initialBalanceRegex = /^\d{1,7}(?:\.\d{1,2})?$/;

  if (initialBalance === "") {
    throw new ValidationError("Initial balance should not be empty");
  }

  if (isNaN(initialBalance) || !initialBalanceRegex.test(initialBalance)) {
    throw new ValidationError("Initial balance should be a valid monetary value (e.g., 100.00)");
  }

  if (initialBalance < -1000000.99 || initialBalance > 1000000.99) {
    throw new ValidationError("Initial balance should be between -1,000,000.99 and 1,000,000.99");
  }
}