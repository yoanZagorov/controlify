import { getWallets } from "@/services/firebase/db/wallet";
import { where } from "firebase/firestore";

export default async function checkWalletNameDuplicate(userId, name) {
  const query = [
    where("deletedAt", "==", null)
  ];

  const activeWallets = await getWallets(userId, query);

  const activeWalletsNames = activeWallets.map(wallet => wallet.name);

  if (activeWalletsNames.includes(name)) {
    throw new Error("A wallet with this name already exists. Please try a different one");
  }
}