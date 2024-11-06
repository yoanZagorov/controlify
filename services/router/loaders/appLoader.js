// import { getAuthUserId } from "services/firebase/db/user";
import { getAuthUserId, getUser, getUserBalance } from "services/firebase/db/user";
import { getUserWallets } from "services/firebase/db/wallet";
import { getUserTodayTransactions } from "services/firebase/db/transaction";
import { getUserCategories } from "services/firebase/db/category";
import { redirect } from "react-router-dom";
import { createRedirectResponse, createSuccessResponse, createErrorResponse } from "../responses";

export default async function appLoader({ request }) {
  const userId = await getAuthUserId();

  if (!userId) {
    const redirectData = {
      originalPath: new URL(request.url).pathname,
      flashMsg: "You must log in first",
      msgType: "alert"
    }

    localStorage.setItem("redirectData", JSON.stringify(redirectData));
    return redirect("/login");
  }

  try {
    const user = await getUser(userId);

    const wallets = await getUserWallets(userId);

    const categories = await getUserCategories(userId);

    const balance = await getUserBalance({ wallets });

    const todayTransactionsByWallet = await getUserTodayTransactions(userId, wallets);

    return {
      user,
      wallets,
      categories,
      balance,
      todayTransactionsByWallet
    };
  } catch (error) {
  }
}