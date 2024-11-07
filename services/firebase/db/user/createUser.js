import { db } from "services/firebase/firebase.config";
import { doc, setDoc } from "firebase/firestore";

import { getDefaultCurrency } from "@/utils/user";
import { createCashWallet } from "../wallet";
import { createCategories } from "../category";
import { AppError } from "@/utils/errors";

export default async function createUser(email, fullName, userId) {
  // To do:
  const defaultCurrency = getDefaultCurrency() || "BGN";

  const userDocRef = doc(db, "users", userId);

  try {
    await setDoc(userDocRef, {
      email,
      fullName,
      profilePic: null,
      defaultCurrency,
      createdAt: new Date()
    })

    await createCategories(userDocRef);
    await createCashWallet(userDocRef);
  } catch (error) {
    throw new AppError("Unable to create your account. Please try again", { cause: error });
  }
}