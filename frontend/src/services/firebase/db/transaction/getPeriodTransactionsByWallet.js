import { where } from "firebase/firestore";
import getTransactions from "./getTransactions";

export default async function getPeriodTransactionsByWallet({ userId, providedWallets = [], periodInfo }) {
  const { start, end } = periodInfo;

  const periodTransactionsQuery = [
    where("date", ">=", start),
    where("date", "<=", end)
  ];
  const periodTransactionsByWallet = await getTransactions({ userId, providedWallets, query: periodTransactionsQuery, dataFormat: "structured" });

  return periodTransactionsByWallet;
}