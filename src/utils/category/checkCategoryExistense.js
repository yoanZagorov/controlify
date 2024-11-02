import { doc, getDoc } from "firebase/firestore";
import { db } from "services/firebase/firebase.config";

export default async function checkCategoryExistense(userId, categoryId) {
  const categoryRef = doc(db, `users/${userId}/categories/${categoryId}`);

  try {
    const categoryDoc = await getDoc(categoryRef);

    return categoryDoc.exists();
  } catch (error) {
    console.error(error);
    throw new Error("Error checking category existence");
  }
}