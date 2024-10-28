import { redirect } from "react-router-dom";

import { getAuthUserId } from "@/utils/auth";
import { getUser, getUserBalance } from "services/firebase/db/user";
import { getUserWallets } from "services/firebase/db/wallet";
import { getUserTodayTransactions } from "services/firebase/db/transaction";
import { getUserCategories } from "services/firebase/db/category";

export default async function appLoader() {
  // To do: check if the repeated call can be evaded
  const authUserId = await getAuthUserId();

  const user = await getUser(authUserId);

  const wallets = await getUserWallets(authUserId);

  const categories = await getUserCategories(authUserId);

  const balance = await getUserBalance({ wallets });

  const todayTransactionsByWallet = await getUserTodayTransactions(authUserId, wallets);

  return {
    user,
    wallets,
    categories,
    balance,
    todayTransactionsByWallet
  };
}