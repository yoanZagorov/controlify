import { doc, getDoc } from "firebase/firestore";
import { db } from "services/firebase/firebase.config";

export default async function getUser(userId) {
  const userDocRef = doc(db, "users", userId);

  try {
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const user = docSnap.data();
      return {
        ...user,
        id: userId
      };
    } else {
      throw new Error("No user doc!")
    }
  } catch (error) {
    console.error(error);
  }
}