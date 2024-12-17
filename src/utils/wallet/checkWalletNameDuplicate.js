import { getWallets } from "@/services/firebase/db/wallet";

export default async function checkWalletNameDuplicate(userId, name) {
  const wallets = await getWallets(userId);

  const walletNames = wallets.map(wallet => wallet.name);

  if (walletNames.includes(name)) {
    throw new Error("A wallet with this name already exists");
  }
}