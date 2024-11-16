import { Timestamp, where } from "firebase/firestore";
import { getTransactions } from "../transaction";
import { performDecimalCalculation } from "@/utils/number";
import { getLastThirtyDaysStartandEnd } from "@/utils/date";

export default async function getBalanceThirtyDaysAgo(userId, allWallets) {
  const { start } = getLastThirtyDaysStartandEnd();

  const q = [
    where("date", "<", start)
  ];

  const transactionsByWallet = await getTransactions(userId, allWallets, q);

  const walletBalances = transactionsByWallet.map(wallet => {
    if (!wallet.transactions.length) {
      return 0;
    }

    return wallet.transactions.reduce((acc, transaction) => {
      const operator = transaction.type === "expense" ? "-" : "+";

      return performDecimalCalculation(acc, transaction.amount, operator);
    }, 0)
  })

  const balanceThirtyDaysAgo = walletBalances.reduce((acc, balance) => performDecimalCalculation(acc, balance, "+"));

  return balanceThirtyDaysAgo;
}