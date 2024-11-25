import { getTransactions } from "../transaction";
import { performDecimalCalculation } from "@/utils/number";

export default async function getBalance(userId, wallets, query) {
  const transactions = await getTransactions({ userId, wallets, query });

  if (!transactions.length) return 0;

  const balance = transactions.reduce((acc, transaction) => {
    const operator = transaction.category.type === "expense" ? "-" : "+";

    return performDecimalCalculation(acc, transaction.amount, operator);
  }, 0);

  return balance;
}