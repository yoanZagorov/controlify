import { getBalanceThirtyDaysAgo } from "services/firebase/db/user";

export default async function getBalanceChartData(userId) {
  const initialBalance = await getBalanceThirtyDaysAgo(userId);
  console.log(initialBalance);
  // const transactions = await getLastThirtyDaysTransactions(); 
}