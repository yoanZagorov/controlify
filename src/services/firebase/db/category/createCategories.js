import { AppError } from "@/utils/errors";
import { collection, addDoc, doc } from "firebase/firestore";
import defaultCategories from "./defaultCategories";

export default function createCategories(userDocRef, batch) {
  // To do: pull the data from a root defaultCategories collection
  const categoriesCollectionRef = collection(userDocRef, "categories");

  const categoriesIds = [];

  defaultCategories.forEach(category => {
    const categoryDocRef = doc(categoriesCollectionRef);
    batch.set(categoryDocRef, { ...category })
    categoriesIds.push(categoryDocRef.id);
  })

  return categoriesIds;
}