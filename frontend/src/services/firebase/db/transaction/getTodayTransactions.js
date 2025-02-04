import { getTodayStartAndEnd } from "@/utils/date";
import { where } from "firebase/firestore";
import getTransactions from "./getTransactions";

export default async function getTodayTransactions(userId, prefetchedAllWallets = [], query = []) {
  const { start, end } = getTodayStartAndEnd();
  const todayTransactionsQuery = [
    where("date", ">=", start),
    where("date", "<=", end),
    ...query
  ];
  const todayTransactions = await getTransactions({ userId, prefetchedWallets: prefetchedAllWallets, query: todayTransactionsQuery });

  // Sorting on the client, since the db structure doesn't allow for proper sorting with the orderBy clause
  return todayTransactions.sort((a, b) => b.date - a.date);
}