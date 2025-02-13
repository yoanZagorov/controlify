import { VALIDATION_RULES } from "@/constants";
import { compareDatesByDay } from "../date";
import { ValidationError } from "../errors";
import validateAmount from "./validateAmount";

export default function validateTransactionData({ amount, walletId, categoryId, date, transactionId = null }) {
  // Amount validation
  validateAmount(amount, VALIDATION_RULES.TRANSACTION.AMOUNT.MIN_AMOUNT, VALIDATION_RULES.TRANSACTION.AMOUNT.MAX_AMOUNT, "transaction amount");

  // Wallet validation
  if (!walletId) {
    throw new ValidationError("Wallet should not be empty");
  }

  // Category validation
  if (!categoryId) {
    throw new ValidationError("Category should not be empty");
  }

  // Date checks
  if (isNaN(date.getTime())) {
    throw new ValidationError("Invalid date");
  }

  // To do (Non-MVP): Implement the ability to schedule transactions but for now keep all future ones disabled
  const today = new Date();
  const isAfterToday = compareDatesByDay(date, today, ">");
  if (isAfterToday) {
    throw new ValidationError("Date should not succeed today");
  }

  // Transaction validation
  // Only relevant for transaction updates
  if (transactionId !== null) {
    if (!transactionId) {
      throw new ValidationError("Transaction should not be empty");
    }
  }
}