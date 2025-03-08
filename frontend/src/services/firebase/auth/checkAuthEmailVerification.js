import { onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import { getEntity } from "@/services/firebase/db/utils/entity";
import { auth, db } from "@/services/firebase/firebase.config";

// This function is used to sync the state between Firebase Authentication and Firestore on email updates
export default async function checkAuthEmailVerification(userId) {
  try {
    const userDocRef = doc(db, `users/${userId}`);
    const user = await getEntity(userDocRef, userId, "user");

    return new Promise((resolve) => {
      const unsubsribe = onAuthStateChanged(auth, async (authUser) => {
        unsubsribe();

        const isEmailDifferent = user.email !== authUser.email;

        if (authUser.emailVerified && isEmailDifferent) {
          await updateDoc(userDocRef, { email: authUser.email });

          resolve(true);
        } else {
          resolve(false);
        }
      })
    })
  } catch (error) {
    console.error(error);
  }
}