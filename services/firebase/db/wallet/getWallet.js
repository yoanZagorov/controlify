import { doc, getDoc } from "firebase/firestore";
import { db } from "services/firebase/firebase.config";

export default async function getWallet(userId, walletId) {
  const walletDocRef = doc(db, `users/${userId}/wallets/${walletId}`);

  try {
    const docSnap = await getDoc(walletDocRef);

    if (docSnap.exists()) {
      return ({
        ...docSnap.data(),
        id: docSnap.id
      });
    } else {
      throw new Error(`A wallet with the id ${walletId} doesn't seem to exist`);
    }
  } catch (error) {
    console.error(error);
  }
}