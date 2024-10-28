import { collection, addDoc } from "firebase/firestore";
import { getDefaultCurrency } from "@/utils/user";

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
      createdAt: new Date()
    })

  } catch (error) {
    console.error(error);
  }
}