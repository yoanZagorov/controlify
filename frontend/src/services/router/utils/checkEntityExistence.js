import { AppError } from "@/utils/errors";
import { getDoc } from "firebase/firestore";

export default async function checkEntityExistence(docRef, entity) {
  try {
    const docSnap = await getDoc(docRef);

    return docSnap.exists();
  } catch (error) {
    throw new AppError(`Error checking ${entity} existence`, { cause: error }); // To do: Create a more user-friendly message and display it
  }
}