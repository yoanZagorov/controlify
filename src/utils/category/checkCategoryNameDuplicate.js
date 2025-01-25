import { getEntities } from "@/services/firebase/db/utils/entity";
import { db } from "@/services/firebase/firebase.config";
import { collection } from "firebase/firestore";

export default async function checkCategoryNameDuplicate(userId, name) {
  const categoriesCollectionRef = collection(db, `users/${userId}/categories`);

  const categories = await getEntities(categoriesCollectionRef, "categories");

  const categoriesNames = categories.map(category => category.name);

  if (categoriesNames.includes(name)) {
    throw new Error("A category with this name already exists. Please try a different one.");
  }
}