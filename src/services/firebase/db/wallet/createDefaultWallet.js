import { collection, addDoc, serverTimestamp, doc } from "firebase/firestore";
import { getDefaultCurrency } from "@/utils/user";
import { AppError } from "@/utils/errors";

export default function createDefaultWallet(userDocRef, batch) {
  // To do:
  const currency = getDefaultCurrency() || "BGN";

  const walletsCollectionRef = collection(userDocRef, "wallets");
  const walletDocRef = doc(walletsCollectionRef);

  batch.set(walletDocRef, {
    name: "cash",
    balance: 0,
    currency,
    iconName: "wallet",
    isDefault: true,
    color: "#35647F",
    createdAt: serverTimestamp(),
    deletedAt: null, // Will be used when implement the ability to delete wallets with soft deletion
  })
  // addDoc(walletsCollectionRef, {
  //   name: "cash",
  //   balance: 0,
  //   currency,
  //   iconName: "wallet",
  //   isDefault: true,
  //   color: "#35647F",
  //   createdAt: serverTimestamp(),
  //   deletedAt: null, // Will be used when implement the ability to delete wallets with soft deletion
  // })
}