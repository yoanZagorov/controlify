import { compareDatesByDay } from "../date";
import { ValidationError } from "../errors";

export default function validateTransactionDate(date) {
  if (isNaN(date.getTime())) throw new ValidationError("Invalid date");
  // To do (Non-MVP): Implement the ability to schedule transactions but for now keep all future ones disabled
  const today = new Date();
  const isAfterToday = compareDatesByDay(date, today, ">");
  if (isAfterToday) {
    throw new ValidationError("Date should not succeed today");
  }
} 