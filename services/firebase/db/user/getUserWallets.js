import { collection, getDocs } from "firebase/firestore";
import { db } from "services/firebase/firebase.config";

export default async function getUserWallets(userId) {
  const walletsRef = collection(db, `users/${userId}/wallets`);

  try {
    const querySnapshot = await getDocs(walletsRef);

    const wallets = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));

    return wallets;
  } catch (error) {
    console.error(error);
    error.message = "Unable to fetch user's wallets";
  }
}