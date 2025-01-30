import { getEntities } from "@/services/firebase/db/utils/entity";
import { db } from "@/services/firebase/firebase.config";
import { collection, where } from "firebase/firestore";

export default async function checkWalletNameDuplicate(userId, name) {
  const walletsCollectionRef = collection(db, `users/${userId}/wallets`);

  const query = [
    where("deletedAt", "==", null)
  ];

  const activeWallets = await getEntities(walletsCollectionRef, "wallets", query);

  const activeWalletsNames = activeWallets.map(wallet => wallet.name);

  if (activeWalletsNames.includes(name)) {
    throw new Error("A wallet with this name already exists. Please try a different one");
  }
}