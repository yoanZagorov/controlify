import { Timestamp } from "firebase/firestore";

export default function formatTransactionData(amount, date) {
  const formattedAmount = Number(Number(amount).toFixed(2));

  const dateObj = new Date(date);

  const formattedDate = Timestamp.fromDate(dateObj);

  return { formattedAmount, formattedDate };
}