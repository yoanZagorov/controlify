import { redirect } from "react-router-dom";

import { getAuthUserId } from "@/utils/auth";
import { getUser, getUserBalance, getUserWallets, getUserTodayTransactions } from "services/firebase/db/user";

export default async function appLoader() {
  // To do: check if the repeated call can be evaded
  const authUserId = await getAuthUserId();

  const user = await getUser(authUserId);

  const wallets = await getUserWallets(authUserId);

  const balance = await getUserBalance({ wallets });

  const todayTransactionsByWallet = await getUserTodayTransactions(authUserId, wallets);
  // console.log(todayTransactions);

  return {
    user,
    wallets,
    balance,
    todayTransactionsByWallet
  };
}