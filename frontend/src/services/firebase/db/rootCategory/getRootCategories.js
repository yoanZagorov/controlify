import { collection } from "firebase/firestore";
import { db } from "../../firebase.config";
import { getEntities } from "../utils/entity";

export default async function getRootCategories(query = []) {
  const rootCategoriesCollectionRef = collection(db, "categories");
  return await getEntities(rootCategoriesCollectionRef, "categories", query);
}