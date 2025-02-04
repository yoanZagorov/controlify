import { orderBy, where } from "firebase/firestore";
import getWallets from "./getWallets";

export default async function getActiveWallets(userId, query = []) {
  const activeWalletsQuery = [
    where("deletedAt", "==", null),
    orderBy("isDefault", "desc"),
    orderBy("createdAt", "desc"),
    ...query
  ];
  return (await getWallets(userId, activeWalletsQuery));
}