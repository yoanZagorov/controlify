import { performDecimalCalculation } from "../number";

export default function calculateBalance(transactions) {
  return transactions.reduce((acc, { convertedAmount, type }) => {
    const operator = type === "expense" ? "-" : "+";
    return performDecimalCalculation(acc, convertedAmount, operator);
  }, 0);
}