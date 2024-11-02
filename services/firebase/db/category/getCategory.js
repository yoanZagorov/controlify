import { doc, getDoc } from "firebase/firestore";
import { db } from "services/firebase/firebase.config";

export default async function getCategory(userId, categoryId) {
  const categoryDocRef = doc(db, `users/${userId}/categories/${categoryId}`);

  try {
    const docSnap = await getDoc(categoryDocRef);

    if (docSnap.exists()) {
      return ({
        ...docSnap.data(),
        id: docSnap.id
      });
    } else {
      throw new Error(`A category with the id ${categoryId} doesn't seem to exist`);
    }
  } catch (error) {
    console.error(error);
  }
}