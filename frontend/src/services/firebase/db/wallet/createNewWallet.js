import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase.config";

export default async function createNewWallet(userId, payload) {
  const walletsCollectionRef = collection(db, `users/${userId}/wallets`);

  try {
    await addDoc(walletsCollectionRef, {
      iconName: "wallet",
      isDefault: false,
      createdAt: serverTimestamp(),
      deletedAt: null,
      ...payload
    })
  } catch (error) {
    throw new Error("Error creating new wallet", { cause: error });
  }
}
