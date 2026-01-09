import { getDoc } from "firebase/firestore";
import { capitalize } from "#utils/str";

// Used to get a single entity - reused for almost all of single entity reads
export default async function getEntity(docRef, docId, entityName) {
  try {
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      throw new Error(`${capitalize(entityName)} with the id ${docId} doesn't seem to exist`);
    };

    return {
      ...docSnapshot.data(),
      id: docSnapshot.id
    }
  } catch (error) {
    throw new Error(`Error fetching ${entityName} with the id ${docId}`, { cause: error });
  }
}