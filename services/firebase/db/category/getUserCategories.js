import { collection, getDocs } from "firebase/firestore";
import { db } from "services/firebase/firebase.config";

export default async function getUserCategories(userId) {
  const categoriesRef = collection(db, `users/${userId}/categories`);

  try {
    const querySnapshot = await getDocs(categoriesRef);

    const categories = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));

    return categories;
  } catch (error) {
    console.error(error);
    return null;
  }
}