import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getDefaultCurrency } from "@/utils/user";
import { AppError } from "@/utils/errors";

export default async function createCashWallet(userDocRef) {
  // To do:
  const currency = getDefaultCurrency() || "BGN";

  const walletsCollectionRef = collection(userDocRef, "wallets");

  try {
    await addDoc(walletsCollectionRef, {
      name: "cash",
      balance: 0,
      currency,
      iconName: "wallet",
      isDefault: true,
      createdAt: serverTimestamp(),
      deletedAt: null, // Will be used when implement the ability to delete wallets with soft deletion
    })

  } catch (error) {
    throw new AppError("Unable to create your default wallet. Please try again", { cause: error });
  }
}