import { formatUserBalance } from "@/utils/formatting";
import { getWallets } from "../wallet";
import { performDecimalCalculation } from "@/utils/number";
import { orderBy, where } from "firebase/firestore";

export default async function getCurrentBalance(userId, wallets) {
  let userWallets = wallets;

  if (!userWallets) {
    const q = [
      where("deletedAt", "==", null),
      orderBy("isDefault", "desc"),
      orderBy("createdAt", "desc")
    ];

    userWallets = await getWallets(userId, q);
  }

  const balance = userWallets.reduce((acc, wallet) => performDecimalCalculation(acc, wallet.balance, "+"), 0);

  return formatUserBalance(balance);
}