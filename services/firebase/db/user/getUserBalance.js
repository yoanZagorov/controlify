import { formatUserBalance } from "@/utils/format";
import getUserWallets from "../wallet/getUserWallets";

export default async function getUserBalance({ userId = null, wallets = null }) {
  let userWallets = wallets;

  if (!userWallets) {
    userWallets = await getUserWallets(userId);
  }

  const balance = userWallets.reduce((acc, wallet) => acc + Number(wallet.balance), 0);
  const formattedBalance = formatUserBalance(balance);

  return formattedBalance;
}