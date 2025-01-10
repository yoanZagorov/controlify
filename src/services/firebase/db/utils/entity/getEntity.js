import { AppError } from "@/utils/errors";
import { capitalize } from "@/utils/str";
import { getDoc } from "firebase/firestore";

export default async function getEntity(docRef, docId, entityName) {
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new AppError(`${capitalize(entityName)} with the id ${docId} doesn't seem to exist`, 404);
  }

  return ({
    ...docSnap.data(),
    id: docSnap.id
  });
}