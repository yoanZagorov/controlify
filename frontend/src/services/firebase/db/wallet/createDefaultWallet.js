import { collection, addDoc, serverTimestamp, doc } from "firebase/firestore";
import { getDefaultCurrency } from "@/utils/user";
import { AppError } from "@/utils/errors";
import { defaultCategories } from "../category";

export default function createDefaultWallet(userDocRef, batch, categories) {
  // To do:
  const currency = getDefaultCurrency() || "BGN";

  const walletsCollectionRef = collection(userDocRef, "wallets");
  const walletDocRef = doc(walletsCollectionRef);

  // const visibleCategories = categoriesIds.map(categoryId => ({ categoryId, isVisible: true })); // Use if you need to keep all the categories

  batch.set(walletDocRef, {
    name: "default",
    balance: 0,
    currency,
    iconName: "wallet",
    isDefault: true,
    color: "#004D40",
    categories,
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