import { AppError } from "@/utils/errors";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase/firebase.config";

export default async function checkCategoryExistense(userId, categoryId) {
  const categoryRef = doc(db, `users/${userId}/categories/${categoryId}`);

  try {
    const categoryDoc = await getDoc(categoryRef);
    return categoryDoc.exists();
  } catch (error) {
    throw new AppError("Error checking category existence", { cause: error }); // To do: Create a more user-friendly message and display it
  }
}