import { db } from "@/services/firebase/firebase.config";
import { collection, doc, serverTimestamp, writeBatch } from "firebase/firestore";

import { getBaseCurrency } from "../currency";
import { getRootCategories } from "../rootCategory";

export default async function createUser(userId, email, fullName) {
  const DEFAULT_WALLET_COLOR = "#004D40";

  try {
    // To do (Non-MVP): get the default user currency through the Geolocation API
    // const defaultCurrency = getUserDefaultCurrency() || await getBaseCurrency();

    const defaultCurrency = (await getBaseCurrency()).code;
    const defaultCategories = await getRootCategories();

    const batch = writeBatch(db);

    // Set user doc
    const userDocRef = doc(db, `users/${userId}`);
    batch.set(userDocRef, {
      email,
      fullName,
      profilePic: null,
      currency: defaultCurrency,
      createdAt: serverTimestamp()
    });

    // Set user categories collection
    const categoriesCollectionRef = collection(db, `users/${userId}/categories`); // Defined outside of the loop to avoid multiple collection() calls
    let walletCategories = [];
    defaultCategories.forEach(category => {
      const categoryDocRef = doc(categoriesCollectionRef);
      batch.set(categoryDocRef, { ...category, createdAt: serverTimestamp() })

      walletCategories.push({ id: categoryDocRef.id, isVisible: true });
    })

    // Set user default wallet doc
    const walletDocRef = doc(collection(db, `users/${userId}/wallets`));
    batch.set(walletDocRef, {
      name: "default",
      balance: 0,
      currency: defaultCurrency,
      iconName: "wallet",
      isDefault: true,
      color: DEFAULT_WALLET_COLOR,
      categories: walletCategories,
      createdAt: serverTimestamp(),
      deletedAt: null,
    })

    await batch.commit();
  } catch (error) {
    throw new Error("Couldn't create the user's Firestore account.", { cause: error });
  }
}