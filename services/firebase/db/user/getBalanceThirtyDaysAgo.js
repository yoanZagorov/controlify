import { Timestamp, where } from "firebase/firestore";
import { getTransactions } from "../transaction";
import { performDecimalCalculation } from "@/utils/number";
import { getLastThirtyDaysStartandEnd } from "@/utils/date";

export default async function getBalanceThirtyDaysAgo(userId, allWallets) {
  const { start } = getLastThirtyDaysStartandEnd();

  const q = [
    where("date", "<", start)
  ];

  const allTransactionsBeforeThirtyDaysByWallet = await getTransactions(userId, allWallets, q);
  const allTransactionsBeforeThirtyDays = allTransactionsBeforeThirtyDaysByWallet.flatMap(wallet => wallet.transactions);

  if (allTransactionsBeforeThirtyDays.length === 0) return 0;

  const balanceThirtyDaysAgo = allTransactionsBeforeThirtyDays.reduce((acc, transaction) => {
    const operator = transaction.category.type === "expense" ? "-" : "+";
    return performDecimalCalculation(acc, transaction.amount, operator);
  }, 0);

  return balanceThirtyDaysAgo;
}