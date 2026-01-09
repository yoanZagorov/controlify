import { HTTP_STATUS_CODES } from "#constants";
import { StatusCodeError } from "#utils/errors";
import { getDocs, query as firebaseQuery } from "firebase/firestore";

// Used to get a collection of entities - reused for almost all of the multiple entity reads
export default async function getEntities(collectionRef, entities, query = []) {
  try {
    // If the query is provided, it gets spreaded and applied. If there isn't a query, the plain collectionRef is used and all documents are retrieved
    const querySnapshot = await getDocs(firebaseQuery(collectionRef, ...query));

    if (querySnapshot.empty) {
      throw new StatusCodeError(`No matching documents found in "${entities}" with the given query parameters`, HTTP_STATUS_CODES.NOT_FOUND);
    };

    const docs = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));

    return docs;
  } catch (error) {
    throw new Error(`Error fetching ${entities}`, { cause: error });
  }
}