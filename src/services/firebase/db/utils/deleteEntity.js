import { capitalize } from "@/utils/str";
import { deleteDoc } from "firebase/firestore";

export default async function deleteEntity(docRef, entity) {
  try {
    await deleteDoc(docRef);
  } catch (error) {
    throw new Error(`The ${capitalize(entity.name)} with id ${entity.id} doesn't seem to exist`)
  }
}