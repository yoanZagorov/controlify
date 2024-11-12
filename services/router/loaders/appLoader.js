import { redirect } from "react-router-dom";

import { getAuthUserId, getUser, getUserBalance } from "services/firebase/db/user";
import { getUserWallets } from "services/firebase/db/wallet";
import { getUserTodayTransactions } from "services/firebase/db/transaction";
import { getUserCategories } from "services/firebase/db/category";

import { createSuccessResponse, createErrorResponse } from "../responses";

import { getStoredData, storeRedirectData } from "@/utils/storage";
import { getRandomItem } from "@/utils/array";
import { quotes } from "@/pages/auth/data";

export default async function appLoader({ request }) {
  const userId = await getAuthUserId();

  if (!userId) {
    const pathname = new URL(request.url).pathname;
    storeRedirectData("You must log in first", "alert", pathname);

    return redirect("/login");
  }

  try {
    const user = await getUser(userId);
    const wallets = await getUserWallets(userId);
    const categories = await getUserCategories(userId);
    const balance = await getUserBalance("_", wallets);
    const todayTransactionsByWallet = await getUserTodayTransactions(userId, wallets); // To do: Order by createdOn

    const storedRedirectData = getStoredData("redirectData");

    const loaderData = {
      userData: {
        user,
        wallets,
        categories,
        balance,
        todayTransactionsByWallet,
      },
      notificationData: storedRedirectData
        ? { redirectData: storedRedirectData }
        : { quote: getRandomItem(quotes) }
    }

    return createSuccessResponse(loaderData);

  } catch (error) {
    // To do: create more specific error messages
    console.error(error);

    if (error?.options?.cause) {
      console.error(error.options.cause)
    }

    // To do: create a Firebase Firestore errors map

    throw createErrorResponse(500, "Sorry, we couldn't load your profile data. Please try again");
  }
}