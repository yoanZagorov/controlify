import { getPeriodInfo } from "@/services/router/utils";
import { collection, where } from "firebase/firestore";
import { db } from "../../firebase.config";
import getTransactions from "./getTransactions";
import { getWallets } from "@/services/router/utils/wallet";

export default async function getPeriodTransactions({ userId, wallets = [], period, dataFormat = "structured" }) {
  const { start, end } = getPeriodInfo(period);

  let allWallets = wallets;
  if (!allWallets.length) {
    allWallets = await getWallets(userId, walletsCollectionRef);
  }

  const transactionsQuery = [
    where("date", ">=", start),
    where("date", "<=", end)
  ];

  const periodTransactionsByWallet = await getTransactions({ userId, wallets: allWallets, query: transactionsQuery, dataFormat });

  return periodTransactionsByWallet;
}