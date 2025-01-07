import { ValidationError } from "../errors";
import { checkEntityExistence } from "@/services/router/utils";

export default async function validateTransactionData({ docRefs, data: { amount, walletId, categoryId, date } }) {
  // Amount checks
  const amountRegex = /^\d{1,7}(?:\.\d{1,2})?$/;

  if (!amount) {
    throw new ValidationError("Amount should not be empty");
  }

  if (isNaN(amount) || !amountRegex.test(amount)) {
    throw new ValidationError("Amount should be a valid monetary value (e.g., 100.00)");
  }

  if (amount < 1 || amount > 1000000.99) {
    throw new ValidationError("Amount should be between 1 and 1,000,000.99");
  }

  // Wallet checks
  if (!walletId) {
    throw new ValidationError("Wallet should not be empty");
  }

  if (!(await checkEntityExistence(docRefs.wallet, "wallet"))) {
    throw new ValidationError("No wallet with this id. Please try a different one", 404);
  }

  // Category checks
  if (!categoryId) {
    throw new ValidationError("Category should not be empty");
  }

  if (!(await checkEntityExistence(docRefs.category, "category"))) {
    throw new ValidationError("No category with this id. Please try a different one", 404);
  }

  // Date checks
  if (!date) {
    throw new ValidationError("Date should not be empty");
  }
}