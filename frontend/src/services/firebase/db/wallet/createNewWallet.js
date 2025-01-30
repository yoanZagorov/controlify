import { addDoc, serverTimestamp } from "firebase/firestore";

export default async function createNewWallet(collectionRef, data) {
  try {
    await addDoc(collectionRef, {
      ...data,
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
