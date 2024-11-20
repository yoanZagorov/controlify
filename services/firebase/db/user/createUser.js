import { db } from "services/firebase/firebase.config";
import { doc, serverTimestamp, setDoc, writeBatch } from "firebase/firestore";

import { getDefaultCurrency } from "@/utils/user";
import { createDefaultWallet } from "../wallet";
import { createCategories } from "../category";
import { AppError } from "@/utils/errors";

export default async function createUser(email, fullName, userId) {
  // To do:
  const defaultCurrency = getDefaultCurrency() || "BGN";
  const userDocRef = doc(db, "users", userId);
  const batch = writeBatch(db);

  batch.set(userDocRef, {
    email,
    fullName,
    profilePic: null,
    defaultCurrency,
    createdAt: serverTimestamp()
  });

  createCategories(userDocRef, batch);
  createDefaultWallet(userDocRef, batch);

  try {
    await batch.commit();
  } catch (error) {
    throw new Error("Unable to create your account. Please try again", { cause: error });
  }
}