import { Timestamp, where } from "firebase/firestore";
import { getTransactions } from "../transaction";
import { getWallets } from "../wallet";
import { performDecimalCalculation } from "@/utils/number";

export default async function getBalanceThirtyDaysAgo(userId) {
  const dateThirtyDaysAgo = new Date();
  dateThirtyDaysAgo.setDate(dateThirtyDaysAgo.getDate() - 30);
  const timestamp = Timestamp.fromDate(dateThirtyDaysAgo);

  const q = [
    where("date", "<", timestamp)
  ];

  const allWallets = await getWallets(userId);
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