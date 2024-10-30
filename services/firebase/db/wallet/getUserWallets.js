import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "services/firebase/firebase.config";

export default async function getUserWallets(userId) {
  const walletsRef = collection(db, `users/${userId}/wallets`);

  const walletsQuery = query(
    walletsRef,
    orderBy("isDefault", "desc"),
    orderBy("createdAt", "desc")
  );

  try {
    const querySnapshot = await getDocs(walletsQuery);

    const wallets = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return wallets;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to load your wallets. Please try refreshing the page");
  }
}