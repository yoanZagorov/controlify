import { checkCategoryExistense } from "../category";
import { checkWalletExistense } from "../wallet";

export default async function verifyTransactionData(userId, amountString, walletId, categoryId, date) {
  // Amount checks
  const amountRegex = /^\d{1,7}(?:\.\d{1,2})?$/;

  if (!amountString) {
    throw new Error("Amount should not be empty");
  }

  const amount = Number(amountString);

  if (isNaN(amount) || !amountRegex.test(amount)) {
    throw new Error("Amount should be a valid monetary value (e.g., 100.00)");
  }

  if (amount < 1 || amount > 1000000.99) {
    throw new Error("Amount should be between 1 and 1,000,000.99");
  }

  // Wallet checks
  if (!walletId) {
    throw new Error("Wallet should not be empty");
  }

  if (!(await checkWalletExistense(userId, walletId))) {
    throw new Error("No wallet with this id. Please try a different one");
  }

  // Category checks
  if (!categoryId) {
    throw new Error("Category should not be empty");
  }

  if (!(await checkCategoryExistense(userId, categoryId))) {
    throw new Error("No category with this id");
  }

  // Date checks
  if (!date) {
    throw new Error("Date should not be empty");
  }
}