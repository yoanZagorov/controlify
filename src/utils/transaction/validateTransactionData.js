import { checkCategoryExistense } from "services/firebase/db/category";
import { checkWalletExistense } from "services/firebase/db/wallet";
import { ValidationError, AppError } from "../errors";

export default async function validateTransactionData(userId, amountString, walletId, categoryId, date) {
  // Amount checks
  const amountRegex = /^\d{1,7}(?:\.\d{1,2})?$/;

  if (!amountString) {
    throw new ValidationError("Amount should not be empty");
  }

  const amount = Number(amountString);

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

  if (!(await checkWalletExistense(userId, walletId))) {
    throw new ValidationError(404, "No wallet with this id. Please try a different one");
  }

  // Category checks
  if (!categoryId) {
    throw new ValidationError("Category should not be empty");
  }

  if (!(await checkCategoryExistense(userId, categoryId))) {
    throw new ValidationError(404, "No category with this id. Please try a different one");
  }

  // Date checks
  if (!date) {
    throw new ValidationError("Date should not be empty");
  }
}