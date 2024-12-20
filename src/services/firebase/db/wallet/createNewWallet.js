import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase.config";

export default async function createNewWallet(userId, walletData) {
  const walletsRef = collection(db, `users/${userId}/wallets`);

  try {
    await addDoc(walletsRef, {
      ...walletData,
      iconName: "wallet",
      isDefault: false,
      createdAt: serverTimestamp(),
      deletedAt: null,
    })
  } catch (error) {
    console.error(error);

    throw new Error("Couldn't create your wallet. Please try again");
  }
}
