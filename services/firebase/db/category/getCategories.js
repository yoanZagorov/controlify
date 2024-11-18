import { AppError } from "@/utils/errors";
import { collection, getDocs, query as firebaseQuery } from "firebase/firestore";
import { db } from "services/firebase/firebase.config";

export default async function getCategories(userId, query = []) {
  const categoriesRef = collection(db, `users/${userId}/categories`);

  const categoriesQuery = query
    ? firebaseQuery(categoriesRef, ...query)
    : categoriesRef;

  try {
    const querySnapshot = await getDocs(categoriesQuery);

    if (querySnapshot.empty) {
      throw new AppError(404, "No categories found");
    };

    const categories = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));

    return categories;
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    } else {
      throw new Error("Error fetching categories", { cause: error }); // To do: Create a more user-friendly message and display it    
    }
  }
}