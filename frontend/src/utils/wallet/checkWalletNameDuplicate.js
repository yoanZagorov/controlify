import { getActiveWallets } from "@/services/firebase/db/wallet";

export default async function checkWalletNameDuplicate(userId, name) {
  const activeWallets = await getActiveWallets(userId);

  const activeWalletsNames = activeWallets.map(wallet => wallet.name);

  if (activeWalletsNames.includes(name)) {
    throw new Error("A wallet with this name already exists. Please try a different one");
  }
}