import { formatUserBalance } from "@/utils/formatting";
import { getUserWallets } from "../wallet";

export default async function getUserBalance(userId, wallets) {
  let userWallets = wallets;

  if (!userWallets) {
    userWallets = await getUserWallets(userId);
  }

  const balance = userWallets.reduce((acc, wallet) => acc + wallet.balance, 0);

  return formatUserBalance(balance);
}