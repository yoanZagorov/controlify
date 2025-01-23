import { getUser } from "@/services/firebase/db/user";
import { getEntity } from "@/services/firebase/db/utils/entity";
import { auth, db } from "@/services/firebase/firebase.config";
import { onAuthStateChanged, updateEmail } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

export default async function checkAuthEmailVerification(userId) {
  const userDocRef = doc(db, `users/${userId}`);

  try {
    const user = await getUser(userId);

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