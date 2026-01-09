import { getEntities } from "#services/firebase/db/utils/entity";
import { db } from "#services/firebase/firebase.config";
import { collection } from "firebase/firestore";

// Get wallets
export default async function getWallets(userId, query) {
  const walletsCollectionRef = collection(db, `users/${userId}/wallets`);
  return await getEntities(walletsCollectionRef, "wallets", query);
}