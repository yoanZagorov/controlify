import { AppError } from "@/utils/errors";
import { collection, getDocs } from "firebase/firestore";
import { db } from "services/firebase/firebase.config";

export default async function getUserCategories(userId) {
  const categoriesRef = collection(db, `users/${userId}/categories`);

  try {
    const querySnapshot = await getDocs(categoriesRef);

    if (querySnapshot.empty) {
      throw new AppError(404, "No categories found");
    };

    const categories = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));

    return categories;
  } catch (error) {
    throw new AppError("Error checking categories existence", { cause: error });
  }
}