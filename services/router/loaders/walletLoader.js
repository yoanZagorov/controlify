import { getWallet } from "services/firebase/db/wallet";
import { createErrorResponse, createSuccessResponse } from "../responses";
import { getAuthUserId } from "services/firebase/db/user";
import { storeRedirectData } from "@/utils/storage";
import { redirect } from "react-router-dom";
import { getBalanceLineChartData } from "@/utils/transaction";
import getExpensesByCategoryPieChartData from "@/utils/category/getExpensesByCategoryPieChartData";

export default async function walletLoader({ params, request }) {
  const userId = await getAuthUserId();

  if (!userId) {
    const pathname = new URL(request.url).pathname;
    storeRedirectData("You must log in first", "alert", pathname);

    return redirect("/login");
  }

  const walletId = params.walletId;

  try {
    const wallet = await getWallet(userId, walletId);
    const { balanceThirtyDaysAgo, balanceChartData } = await getBalanceLineChartData(userId, [wallet]);
    const expensesByCategoryChartData = await getExpensesByCategoryPieChartData(userId, [wallet]);

    return createSuccessResponse({ wallet, balanceThirtyDaysAgo, balanceChartData, expensesByCategoryChartData });
  } catch (error) {
    console.error(error);

    return createErrorResponse(500, "Sorry, we couldn't load your wallet data. Please try again");
  }
}