import { AppError } from "@/utils/errors";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase/firebase.config";

export default async function getCategory(userId, categoryId) {
  const categoryDocRef = doc(db, `users/${userId}/categories/${categoryId}`);

  const docSnap = await getDoc(categoryDocRef);

  if (!docSnap.exists()) {
    throw new AppError(`A category with the id ${categoryId} doesn't seem to exist`, 404);
  }

  return ({
    ...docSnap.data(),
    id: docSnap.id
  });
}